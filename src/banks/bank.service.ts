import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { BaseCrudService } from "src/shared/base/base-crud";
import { APIFeaturesService } from "src/shared/filters/filter.service";
import { ICrudService } from "src/shared/interfaces/crud-service.interface";
import { Repository } from "typeorm";
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
}
