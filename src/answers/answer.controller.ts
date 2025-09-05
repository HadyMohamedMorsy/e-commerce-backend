import { Body, Controller, Post, Put, Req } from "@nestjs/common";
import { BaseController } from "src/shared/base/base.controller";
import { Roles } from "src/shared/decorators/roles.decorator";
import { RelationOptions, SelectOptions } from "src/shared/interfaces/query.interface";
import { Answer } from "./answer.entity";
import { AnswerService } from "./answer.service";
import { AnswerDto } from "./dtos/create.dto";
import { PatchAnswerDto } from "./dtos/patch.dto";

@Controller("answers")
export class AnswerController
  extends BaseController<Answer, AnswerDto, PatchAnswerDto>
  implements SelectOptions, RelationOptions
{
  constructor(protected readonly service: AnswerService) {
    super(service);
  }

  public selectOptions(): Record<string, boolean> {
    return {
      id: true,
      created_at: true,
      updated_at: true,
      answerText: true,
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
      quiz: {
        id: true,
        question: true,
      },
      book: {
        id: true,
        title: true,
      },
    };
  }

  @Post("/store")
  @Roles("CEO", "TECH_SUPPORT", "STORE_MANAGER", "SUPER_ADMIN", "CONTENT_MANAGER", "SYSTEM_ADMIN")
  public create(@Body() create: AnswerDto, @Req() req: Request) {
    return this.service.create(
      {
        answerText: create.answerText,
        quiz: req["question"],
        book: req["book"],
        createdBy: req["createdBy"],
      },
      this.selectOptions(),
      this.getRelationOptions(),
    );
  }

  @Put("/update")
  @Roles("CEO", "TECH_SUPPORT", "STORE_MANAGER", "SUPER_ADMIN", "CONTENT_MANAGER", "SYSTEM_ADMIN")
  public async update(@Body() update: PatchAnswerDto, @Req() req: Request) {
    return await this.service.update(
      {
        id: update.id,
        quiz: req["question"],
        book: req["book"],
        answerText: update.answerText,
        createdBy: req["createdBy"],
      },
      this.selectOptions(),
      this.getRelationOptions(),
    );
  }
}
