import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { BaseService } from "src/shared/base/base";
import { APIFeaturesService } from "src/shared/filters/filter.service";
import { ICrudService } from "src/shared/interfaces/crud-service.interface";
import { Repository } from "typeorm";
import { PaperTypeDto } from "./dtos/create.dto";
import { PatchPaperTypeDto } from "./dtos/patch.dto";
import { PaperType } from "./paper-type.entity";

@Injectable()
export class PaperTypeService
  extends BaseService<PaperType, PaperTypeDto, PatchPaperTypeDto>
  implements ICrudService<PaperType, PaperTypeDto, PatchPaperTypeDto>
{
  constructor(
    apiFeaturesService: APIFeaturesService,
    @InjectRepository(PaperType)
    repository: Repository<PaperType>,
  ) {
    super(repository, apiFeaturesService);
  }
}
