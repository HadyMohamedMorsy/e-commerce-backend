import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { BaseService } from "src/shared/base/base";
import { APIFeaturesService } from "src/shared/filters/filter.service";
import { ICrudService } from "src/shared/interfaces/crud-service.interface";
import { Repository } from "typeorm";
import { Answer } from "./answer.entity";
import { AnswerDto } from "./dtos/create.dto";
import { PatchAnswerDto } from "./dtos/patch.dto";

@Injectable()
export class AnswerService
  extends BaseService<Answer, AnswerDto, PatchAnswerDto>
  implements ICrudService<Answer, AnswerDto, PatchAnswerDto>
{
  constructor(
    apiFeaturesService: APIFeaturesService,
    @InjectRepository(Answer)
    repository: Repository<Answer>,
  ) {
    super(repository, apiFeaturesService);
  }
}
