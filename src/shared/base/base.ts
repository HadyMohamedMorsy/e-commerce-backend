// src/shared/base-crud.service.ts
import { NotFoundException } from "@nestjs/common";
import { In, Repository } from "typeorm";
import { APIFeaturesService } from "../filters/filter.service";
import { ICrudService } from "../interfaces/crud-service.interface";
import { BaseQueryUtils } from "./base-query.utils";

interface PaginationResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
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

  public async findFront(query: {
    query?: {
      search?: string;
      filters?: Record<string, any>;
      page?: number;
      limit?: number;
      sort?: { field: string; order: "ASC" | "DESC" };
      select?: string[];
      isPagination?: string;
    };
  }): Promise<any> {
    const queryParams = query.query;
    const { search, filters, page = 1, limit = 10, sort, select, isPagination } = queryParams;
    console.log(queryParams);
    let queryBuilder = this.repository.createQueryBuilder("e");
    queryBuilder = this.applySearch(queryBuilder, search);
    queryBuilder = this.applyFilters(queryBuilder, filters);
    queryBuilder = this.applySorting(queryBuilder, sort);
    queryBuilder = this.applyPagination(queryBuilder, page, limit);
    queryBuilder = this.applySelect(queryBuilder, select);

    const [filteredRecord, totalRecords] = await queryBuilder.getManyAndCount();

    return isPagination === "true"
      ? this.paginationResponse(filteredRecord, totalRecords, page, limit)
      : { data: filteredRecord };
  }

  private paginationResponse(
    data: T[],
    total: number,
    page: number,
    limit: number,
  ): PaginationResponse<T> {
    return {
      data,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  }
}
