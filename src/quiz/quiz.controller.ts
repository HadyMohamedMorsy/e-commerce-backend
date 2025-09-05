import { Body, Controller, Get, Post, Put, Req } from "@nestjs/common";
import { BaseController } from "src/shared/base/base.controller";
import { Roles } from "src/shared/decorators/roles.decorator";
import { RelationOptions, SelectOptions } from "src/shared/interfaces/query.interface";
import { QuizDto } from "./dtos/create.dto";
import { PatchQuizDto } from "./dtos/patch.dto";
import { Quiz } from "./quiz.entity";
import { QuizService } from "./quiz.service";

@Controller("quiz")
export class QuizController
  extends BaseController<Quiz, QuizDto, PatchQuizDto>
  implements SelectOptions, RelationOptions
{
  constructor(protected readonly service: QuizService) {
    super(service);
  }

  public selectOptions(): Record<string, boolean> {
    return {
      id: true,
      created_at: true,
      updated_at: true,
      question: true,
      questionType: true,
      createdBy: true,
    };
  }

  public getRelationOptions(): Record<string, any> {
    return {
      createdBy: {
        id: true,
        firstName: true,
        lastName: true,
      },
    };
  }

  @Post("/store")
  @Roles("CEO", "TECH_SUPPORT", "STORE_MANAGER", "SUPER_ADMIN", "CONTENT_MANAGER", "SYSTEM_ADMIN")
  public create(@Body() create: QuizDto, @Req() req: Request) {
    return this.service.create(
      {
        question: create.question,
        questionType: create.questionType,
        createdBy: req["createdBy"],
      },
      this.selectOptions(),
      this.getRelationOptions(),
    );
  }

  @Put("/update")
  @Roles("CEO", "TECH_SUPPORT", "STORE_MANAGER", "SUPER_ADMIN", "CONTENT_MANAGER", "SYSTEM_ADMIN")
  public async update(@Body() update: PatchQuizDto, @Req() req: Request) {
    return await this.service.update(
      {
        id: update.id,
        question: update.question,
        questionType: update.questionType,
        createdBy: req["createdBy"],
      },
      this.selectOptions(),
      this.getRelationOptions(),
    );
  }

  @Get("/questions-with-answers")
  public async getQuestionsWithAnswers() {
    return await this.service.getQuestionsWithAnswers();
  }
}
