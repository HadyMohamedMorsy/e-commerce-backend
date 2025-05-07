import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { BaseService } from "src/shared/base/base-crud";
import { APIFeaturesService } from "src/shared/filters/filter.service";
import { ICrudService } from "src/shared/interfaces/crud-service.interface";
import { Repository, SelectQueryBuilder } from "typeorm";
import { TaxDto } from "./dtos/create.dto";
import { PatchTaxDto } from "./dtos/patch.dto";
import { Tax } from "./tax.entity";

@Injectable()
export class TaxService
  extends BaseService<Tax, TaxDto, PatchTaxDto>
  implements ICrudService<Tax, TaxDto, PatchTaxDto>
{
  constructor(
    apiFeaturesService: APIFeaturesService,
    @InjectRepository(Tax)
    repository: Repository<Tax>,
  ) {
    super(repository, apiFeaturesService);
  }

  override queryRelation(queryBuilder: SelectQueryBuilder<any>) {
    queryBuilder.leftJoinAndSelect("Tax.location", "location");
  }
}
