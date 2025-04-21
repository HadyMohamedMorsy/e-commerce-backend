import { Body, Controller, Delete, HttpCode, Post, Req } from "@nestjs/common";
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
  public create(@Body() createDto: FaqDto, @Req() req: Request) {
    return this.service.create({
      ...createDto,
      createdBy: req["createdBy"],
    });
  }

  @Post("/update")
  public async update(@Body() update: PatchFaqDto, @Req() req: Request) {
    return await this.service.update({
      ...update,
      createdBy: req["createdBy"],
    });
  }

  @Delete("/delete")
  public delete(@Body() id: number) {
    return this.service.delete(id);
  }
}
