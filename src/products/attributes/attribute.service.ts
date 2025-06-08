import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { BaseService } from "src/shared/base/base";
import { APIFeaturesService } from "src/shared/filters/filter.service";
import { ICrudService } from "src/shared/interfaces/crud-service.interface";
import { Repository, SelectQueryBuilder } from "typeorm";
import { Attribute } from "./attribute.entity";
import { IAttribute } from "./dtos/create.dto";
import { PatchAttributeDto } from "./dtos/patch.dto";

@Injectable()
export class AttributeService
  extends BaseService<Attribute, IAttribute, PatchAttributeDto>
  implements ICrudService<Attribute, IAttribute, PatchAttributeDto>
{
  constructor(
    apiFeaturesService: APIFeaturesService,
    @InjectRepository(Attribute)
    repository: Repository<Attribute>,
  ) {
    super(repository, apiFeaturesService);
  }

  override queryRelationIndex(queryBuilder: SelectQueryBuilder<Attribute>, filterData: any) {
    queryBuilder.leftJoin("e.product", "product").addSelect(["product.id", "product.name"]);

    if (filterData.productId) {
      queryBuilder.andWhere("product.id = :productId", { productId: filterData.productId });
    }
  }
}
