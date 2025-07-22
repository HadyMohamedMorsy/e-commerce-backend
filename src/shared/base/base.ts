// src/shared/base-crud.service.ts
import { NotFoundException } from "@nestjs/common";
import { In, Repository } from "typeorm";
import { APIFeaturesService } from "../filters/filter.service";
import { ICrudService } from "../interfaces/crud-service.interface";
import { BaseQueryUtils } from "./base-query.utils";

interface PaginationResponse<T> {
  data: T[];
  recordsFiltered: number;
  totalRecords: number;
}

export abstract class BaseService<T, CreateDto, UpdateDto>
  extends BaseQueryUtils<T>
  implements ICrudService<T, CreateDto, UpdateDto>
{
  constructor(
    protected readonly repository: Repository<T>,
    protected readonly apiService: APIFeaturesService,
  ) {
    super();
  }

  public async findAll(filterData: any) {
    const queryBuilder = this.apiService
      .setRepository(this.repository.target)
      .buildQuery(filterData);

    this.queryRelationIndex(queryBuilder, filterData);

    const filteredRecord = await queryBuilder.getMany();
    const totalRecords = await queryBuilder.getCount();

    return this.response(filteredRecord, totalRecords);
  }

  public async findOne(
    id: number,
    selectOptions?: Record<string, boolean>,
    relations?: Record<string, any>,
  ): Promise<T> {
    const queryBuilder = this.repository.createQueryBuilder("e");
    queryBuilder.where("e.id = :id", { id });

    this.getSelectQuery(queryBuilder, selectOptions);
    this.getRelationQuery(queryBuilder, relations);
    const record = await queryBuilder.getOne();
    if (!record) throw new NotFoundException(`not found`);

    return record;
  }

  public async create(
    createDto: CreateDto,
    selectOptions?: Record<string, boolean>,
    relations?: Record<string, any>,
  ): Promise<T> {
    const newCreate = this.repository.create(createDto as any);
    const record = (await this.repository.save(newCreate)) as T & { id: number };
    return this.findOne(record.id, selectOptions, relations);
  }

  public async update(
    updateDto: UpdateDto & { id: number },
    selectOptions?: Record<string, boolean>,
    relations?: Record<string, any>,
  ): Promise<T> {
    await this.repository.update(updateDto.id, updateDto as any);
    return this.findOne(updateDto.id, selectOptions, relations);
  }

  public async delete(id: number) {
    await this.repository.delete(id);
    return { deleted: true, id };
  }

  async getList(filterData: any = {}) {
    const records = await this.repository.find({ where: filterData });
    return {
      data: records,
    };
  }

  public async changeStatus(
    id: number,
    status: string | boolean,
    key: string,
    selectOptions?: Record<string, boolean>,
  ) {
    await this.repository.update(id, { [key]: status } as any);
    return this.findOne(id, selectOptions);
  }

  async findByIds(ids: number[]): Promise<T[]> {
    return this.repository.findBy({ id: In(ids) } as any);
  }

  protected applyRelations(
    queryBuilder: any,
    relations?: {
      [key: string]: {
        select?: string[];
        filters?: {
          [key: string]: any;
        };
      };
    },
  ) {
    if (!relations) return queryBuilder;
    Object.entries(relations).forEach(([relation, options]) => {
      queryBuilder.leftJoin(`e.${relation}`, relation);

      if (options.filters) {
        Object.entries(options.filters).forEach(([field, value]) => {
          if (value !== undefined && value !== null) {
            queryBuilder.andWhere(`${relation}.${field} = :${relation}_${field}`, {
              [`${relation}_${field}`]: value,
            });
          }
        });
      }

      if (options.select && options.select.length > 0) {
        const selectedFields = options.select.map(field => `${relation}.${field}`);
        queryBuilder.addSelect(selectedFields);
      }
    });

    return queryBuilder;
  }

  public async findFront(query: {
    query?: {
      search?: string;
      filters?: Record<string, any>;
      customFilters?: Record<string, any>;
      page?: number;
      limit?: number;
      sort?: { field: string; order: "ASC" | "DESC" };
      select?: string[];
      relations?: {
        [key: string]: {
          select?: string[];
          filters?: {
            [key: string]: any;
          };
        };
      };
      isPagination?: string;
    };
  }): Promise<any> {
    const queryParams = query.query;

    let queryBuilder = this.repository.createQueryBuilder("e");
    queryBuilder = this.applySearch(queryBuilder, queryParams?.search || "");
    queryBuilder = this.applyFilters(
      queryBuilder,
      queryParams?.filters,
      queryParams?.customFilters,
    );
    queryBuilder = this.applySorting(queryBuilder, queryParams?.sort);
    queryBuilder = this.applyPagination(
      queryBuilder,
      +queryParams?.page,
      +queryParams?.limit,
      queryParams?.isPagination,
    );
    queryBuilder = this.applyLimit(queryBuilder, +queryParams?.limit, queryParams?.isPagination);
    queryBuilder = this.applySelect(queryBuilder, queryParams?.select);
    queryBuilder = this.applyRelations(queryBuilder, queryParams?.relations);
    const [filteredRecord, totalRecords] = await queryBuilder.getManyAndCount();

    return queryParams?.isPagination === "true"
      ? this.paginationResponse(filteredRecord, totalRecords)
      : { data: filteredRecord };
  }

  private paginationResponse(data: T[], total: number): PaginationResponse<T> {
    return {
      data,
      recordsFiltered: data.length,
      totalRecords: +total,
    };
  }
}
