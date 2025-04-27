import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { BaseCrudService } from "src/shared/base/base-crud";
import { APIFeaturesService } from "src/shared/filters/filter.service";
import { ICrudService } from "src/shared/interfaces/crud-service.interface";
import { Repository, SelectQueryBuilder } from "typeorm";
import { Bank } from "./bank.entity";
import { BankDto } from "./dtos/create.dto";
import { PatchBankDto } from "./dtos/patch.dto";

@Injectable()
export class BanksService
  extends BaseCrudService<Bank, BankDto, PatchBankDto>
  implements ICrudService<Bank, BankDto, PatchBankDto>
{
  constructor(
    apiFeaturesService: APIFeaturesService,
    @InjectRepository(Bank)
    repository: Repository<Bank>,
  ) {
    super(repository, apiFeaturesService);
  }

  override queryRelation(queryBuilder?: SelectQueryBuilder<any>, filteredRecord?: any) {
    super.queryRelation(queryBuilder, filteredRecord);
    queryBuilder
      .leftJoin("e.country", "country")
      .addSelect(["country.id", "country.name"])
      .leftJoin("e.region", "region")
      .addSelect(["region.id", "region.name"])
      .leftJoin("e.city", "city")
      .addSelect(["city.id", "city.name"])
      .leftJoin("e.area", "area")
      .addSelect(["area.id", "area.name"]);
  }
}
