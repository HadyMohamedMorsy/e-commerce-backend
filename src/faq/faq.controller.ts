import { Body, Controller, Delete, HttpCode, Post, Req } from "@nestjs/common";
import { FaqList } from "src/shared/enum/global-enum";
import { FaqDto } from "./dtos/create.dto";
import { PatchFaqDto } from "./dtos/patch.dto";
import { FaqsService } from "./faq.service";

@Controller("faq")
export class FaqController {
  constructor(private readonly service: FaqsService) {}

  @Post("/index")
  @HttpCode(200)
  public index(@Body() filter: any) {
    return this.service.findAll(filter);
  }

  @Post("/store")
  public create(@Body() create: FaqDto, @Req() req: Request) {
    return this.service.create({
      select_questionable_type: create.select_questionable_type,
      question: create.question,
      answer: create.answer,
      createdBy: req["createdBy"],
      productId: create.select_questionable_type === FaqList.Product ? req["product"] : null,
    });
  }

  @Post("/update")
  public async update(@Body() update: PatchFaqDto, @Req() req: Request) {
    return await this.service.update({
      id: update.id,
      select_questionable_type: update.select_questionable_type,
      question: update.question,
      answer: update.answer,
      createdBy: req["createdBy"],
      productId: update.select_questionable_type === FaqList.Product ? req["product"] : null,
    });
  }

  @Delete("/delete")
  public delete(@Body() id: number) {
    return this.service.delete(id);
  }
}
