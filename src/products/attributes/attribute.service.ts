import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { BaseService } from "src/shared/base/base-crud";
import { APIFeaturesService } from "src/shared/filters/filter.service";
import { ICrudService } from "src/shared/interfaces/crud-service.interface";
import { Repository, SelectQueryBuilder } from "typeorm";
import { Attribute } from "./attribute.entity";
import { AttributeDto } from "./dtos/create.dto";
import { PatchAttributeDto } from "./dtos/patch.dto";

@Injectable()
export class AttributeService
  extends BaseService<Attribute, AttributeDto, PatchAttributeDto>
  implements ICrudService<Attribute, AttributeDto, PatchAttributeDto>
{
  constructor(
    apiFeaturesService: APIFeaturesService,
    @InjectRepository(Attribute)
    repository: Repository<Attribute>,
  ) {
    super(repository, apiFeaturesService);
  }

  queryRelation(queryBuilder: SelectQueryBuilder<Attribute>, filterData: any) {
    queryBuilder.leftJoinAndSelect("Attribute.product", "product");

    if (filterData.productId) {
      queryBuilder.andWhere("product.id = :productId", { productId: filterData.productId });
    }
  }
}
