import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { BaseService } from "src/shared/base/base";
import { APIFeaturesService } from "src/shared/filters/filter.service";
import { ICrudService } from "src/shared/interfaces/crud-service.interface";
import { Repository } from "typeorm";
import { QuizDto } from "./dtos/create.dto";
import { PatchQuizDto } from "./dtos/patch.dto";
import { Quiz } from "./quiz.entity";

@Injectable()
export class QuizService
  extends BaseService<Quiz, QuizDto, PatchQuizDto>
  implements ICrudService<Quiz, QuizDto, PatchQuizDto>
{
  constructor(
    apiFeaturesService: APIFeaturesService,
    @InjectRepository(Quiz)
    repository: Repository<Quiz>,
  ) {
    super(repository, apiFeaturesService);
  }
}
