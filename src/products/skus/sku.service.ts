import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { BaseService } from "src/shared/base/base-crud";
import { APIFeaturesService } from "src/shared/filters/filter.service";
import { ICrudService } from "src/shared/interfaces/crud-service.interface";
import { Repository, SelectQueryBuilder } from "typeorm";
import { SkuDto } from "./dtos/create.dto";
import { PatchSkuDto } from "./dtos/patch.dto";
import { ProductSku } from "./sku.entity";

@Injectable()
export class SkuService
  extends BaseService<ProductSku, SkuDto, PatchSkuDto>
  implements ICrudService<ProductSku, SkuDto, PatchSkuDto>
{
  constructor(
    apiFeaturesService: APIFeaturesService,
    @InjectRepository(ProductSku)
    repository: Repository<ProductSku>,
  ) {
    super(repository, apiFeaturesService);
  }

  queryRelation(queryBuilder: SelectQueryBuilder<ProductSku>, filterData: any) {
    queryBuilder.leftJoinAndSelect("ProductSku.product", "product");

    if (filterData.productId) {
      queryBuilder.andWhere("product.id = :productId", { productId: filterData.productId });
    }
  }
}
