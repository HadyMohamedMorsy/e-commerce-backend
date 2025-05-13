import { Body, Controller, Post, Put, Req } from "@nestjs/common";
import { BaseController } from "src/shared/base/base.controller";
import { Roles } from "src/shared/decorators/roles.decorator";
import { FaqList } from "src/shared/enum/global-enum";
import { RelationOptions, SelectOptions } from "src/shared/interfaces/query.interface";
import { FaqDto } from "./dtos/create.dto";
import { PatchFaqDto } from "./dtos/patch.dto";
import { Faq } from "./faq.entity";
import { FaqsService } from "./faq.service";

@Controller("faq")
export class FaqController
  extends BaseController<Faq, FaqDto, PatchFaqDto>
  implements SelectOptions, RelationOptions
{
  constructor(protected readonly service: FaqsService) {
    super(service);
  }

  public selectOptions(): Record<string, boolean> {
    return {
      id: true,
      created_at: true,
      updated_at: true,
      question: true,
      answer: true,
      selectQuestionableType: true,
      product: true,
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
      product: {
        id: true,
        name: true,
      },
    };
  }

  @Post("/store")
  @Roles("CEO", "TECH_SUPPORT", "STORE_MANAGER", "SUPER_ADMIN", "CONTENT_MANAGER", "SYSTEM_ADMIN")
  public create(@Body() create: FaqDto, @Req() req: Request) {
    console.log(req["product"]);
    return this.service.create(
      {
        selectQuestionableType: create.selectQuestionableType,
        question: create.question,
        answer: create.answer,
        createdBy: req["createdBy"],
        product: create.selectQuestionableType === FaqList.Product ? req["product"] : null,
      },
      this.selectOptions(),
      this.getRelationOptions(),
    );
  }

  @Put("/update")
  @Roles("CEO", "TECH_SUPPORT", "STORE_MANAGER", "SUPER_ADMIN", "CONTENT_MANAGER", "SYSTEM_ADMIN")
  public async update(@Body() update: PatchFaqDto, @Req() req: Request) {
    return await this.service.update(
      {
        id: update.id,
        selectQuestionableType: update.selectQuestionableType,
        question: update.question,
        answer: update.answer,
        createdBy: req["createdBy"],
        product: update.selectQuestionableType === FaqList.Product ? req["product"] : null,
      },
      this.selectOptions(),
      this.getRelationOptions(),
    );
  }
}
