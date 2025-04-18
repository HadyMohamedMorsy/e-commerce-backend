import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { BaseCrudService } from "src/shared/base/base-crud";
import { APIFeaturesService } from "src/shared/filters/filter.service";
import { ICrudService } from "src/shared/interfaces/crud-service.interface";
import { Repository } from "typeorm";
import { FaqDto } from "./dtos/create.dto";
import { PatchFaqDto } from "./dtos/patch.dto";
import { Faq } from "./faq.entity";

@Injectable()
export class FaqsService
  extends BaseCrudService<Faq, FaqDto, PatchFaqDto>
  implements ICrudService<Faq, FaqDto, PatchFaqDto>
{
  constructor(
    apiFeaturesService: APIFeaturesService,
    @InjectRepository(Faq)
    repository: Repository<Faq>,
  ) {
    super(repository, apiFeaturesService);
  }
}
