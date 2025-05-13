import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { BaseService } from "src/shared/base/base";
import { APIFeaturesService } from "src/shared/filters/filter.service";
import { ICrudService } from "src/shared/interfaces/crud-service.interface";
import { Repository, SelectQueryBuilder } from "typeorm";
import { TaxDto } from "./dtos/create.dto";
import { PatchTaxDto } from "./dtos/patch.dto";
import { Taxes } from "./tax.entity";

@Injectable()
export class TaxService
  extends BaseService<Taxes, TaxDto, PatchTaxDto>
  implements ICrudService<Taxes, TaxDto, PatchTaxDto>
{
  constructor(
    apiFeaturesService: APIFeaturesService,
    @InjectRepository(Taxes)
    repository: Repository<Taxes>,
  ) {
    super(repository, apiFeaturesService);
  }

  override queryRelationIndex(queryBuilder: SelectQueryBuilder<any>) {
    queryBuilder.leftJoinAndSelect("e.country", "country");
  }
}
