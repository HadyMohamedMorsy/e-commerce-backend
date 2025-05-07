import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { BaseService } from "src/shared/base/base-crud";
import { APIFeaturesService } from "src/shared/filters/filter.service";
import { ICrudService } from "src/shared/interfaces/crud-service.interface";
import { Repository, SelectQueryBuilder } from "typeorm";
import { SkuDto } from "./dtos/create.dto";
import { PatchSkuDto } from "./dtos/patch.dto";
import { Sku } from "./sku.entity";

@Injectable()
export class SkuService
  extends BaseService<Sku, SkuDto, PatchSkuDto>
  implements ICrudService<Sku, SkuDto, PatchSkuDto>
{
  constructor(
    apiFeaturesService: APIFeaturesService,
    @InjectRepository(Sku)
    repository: Repository<Sku>,
  ) {
    super(repository, apiFeaturesService);
  }

  queryRelation(queryBuilder: SelectQueryBuilder<Sku>, filterData: any) {
    queryBuilder.leftJoinAndSelect("Sku.product", "product");

    if (filterData.productId) {
      queryBuilder.andWhere("product.id = :productId", { productId: filterData.productId });
    }
  }
}
