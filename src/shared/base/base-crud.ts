// src/shared/base-crud.service.ts
import { NotFoundException } from "@nestjs/common";
import { In, Repository, SelectQueryBuilder } from "typeorm";
import { APIFeaturesService } from "../filters/filter.service";
import { ICrudService } from "../interfaces/crud-service.interface";

export abstract class BaseCrudService<T, CreateDto, UpdateDto>
  implements ICrudService<T, CreateDto, UpdateDto>
{
  constructor(
    protected readonly repository: Repository<T>,
    protected readonly apiService: APIFeaturesService,
  ) {}

  public async findAll(filterData: any) {
    const queryBuilder = this.apiService
      .setRepository(this.repository.target)
      .buildQuery(filterData);

    this.queryRelation(queryBuilder, filterData);

    const filteredRecord = await queryBuilder.getMany();
    const totalRecords = await queryBuilder.getCount();

    return this.response(filteredRecord, totalRecords);
  }

  public async findOne(id: number): Promise<T> {
    const record = await this.repository.findOne({ where: { id } as any });
    if (!record) {
      throw new NotFoundException(`not found`);
    }
    return record;
  }

  public async create(createDto: CreateDto): Promise<T[]> {
    const newUser = this.repository.create(createDto as any);
    return await this.repository.save(newUser);
  }

  public async update(updateDto: UpdateDto & { id: number }): Promise<T> {
    await this.repository.update(updateDto.id, updateDto as any);
    return this.findOne(updateDto.id);
  }

  public async delete(id: number) {
    await this.repository.delete(id);
    return { deleted: true, id };
  }

  public async response(data: any[], totalRecords: number) {
    return {
      data,
      recordsFiltered: data.length,
      totalRecords: +totalRecords,
    };
  }

  async getList() {
    return await this.repository.find();
  }

  public async changeStatus(id: number, status: string | boolean) {
    await this.repository.update(id, { status } as any);
    return this.findOne(id);
  }
  async findByIds(ids: number[]): Promise<T[]> {
    return this.repository.findBy({ id: In(ids) } as any);
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  queryRelation(queryBuilder?: SelectQueryBuilder<any>, filteredRecord?: any) {
    queryBuilder.leftJoin("e.createdBy", "ec").addSelect(["ec.id", "ec.firstName", "ec.lastName"]);
  }
}
