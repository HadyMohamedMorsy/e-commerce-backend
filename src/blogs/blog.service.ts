import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { BaseCrudService } from "src/shared/base/base-crud";
import { APIFeaturesService } from "src/shared/filters/filter.service";
import { ICrudService } from "src/shared/interfaces/crud-service.interface";
import { Repository } from "typeorm";
import { Blog } from "./blog.entity";
import { BankDto } from "./dtos/create.dto";
import { PatchBankDto } from "./dtos/patch.dto";

@Injectable()
export class BlogsService
  extends BaseCrudService<Blog, BankDto, PatchBankDto>
  implements ICrudService<Blog, BankDto, PatchBankDto>
{
  constructor(
    apiFeaturesService: APIFeaturesService,
    @InjectRepository(Blog)
    repository: Repository<Blog>,
  ) {
    super(repository, apiFeaturesService);
  }
}
