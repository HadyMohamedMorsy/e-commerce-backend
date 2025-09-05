import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { BaseService } from "src/shared/base/base";
import { QuestionType } from "src/shared/enum/global-enum";
import { APIFeaturesService } from "src/shared/filters/filter.service";
import { ICrudService } from "src/shared/interfaces/crud-service.interface";
import { In, Repository } from "typeorm";
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

  async getQuestionsWithIdAndTitle(): Promise<{ value: number; label: string }[]> {
    const questions = await this.repository.find({
      select: ["id", "question", "questionType"],
      where: {
        questionType: In([QuestionType.SELECT, QuestionType.CHECKBOX]),
      },
    });

    return questions.map(question => ({
      value: question.id,
      label: question.question,
    }));
  }

  async getQuestionsWithAnswers() {
    const questions = await this.repository.find({
      select: ["id", "question", "questionType"],
      relations: ["answers"],
    });

    return questions.map(question => ({
      id: question.id,
      question: question.question,
      questionType: question.questionType,
      answers:
        question.questionType === QuestionType.INPUT
          ? []
          : question.answers?.map(answer => ({
              id: answer.id,
              answerText: answer.answerText,
            })) || [],
    }));
  }
}
