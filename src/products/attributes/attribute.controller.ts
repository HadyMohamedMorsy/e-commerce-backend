import { Body, Controller, Delete, HttpCode, Post, Req } from "@nestjs/common";
import { AttributeService } from "./attribute.service";
import { AttributeDto } from "./dtos/create.dto";
import { PatchAttributeDto } from "./dtos/patch.dto";

@Controller("attribute")
export class AttributeController {
  constructor(private readonly service: AttributeService) {}

  @Post("/index")
  @HttpCode(200)
  public index(@Body() filter: any) {
    return this.service.findAll(filter);
  }

  @Post("/store")
  public create(@Body() createDto: AttributeDto, @Req() req: Request) {
    return this.service.create({
      name: createDto.name,
      value: createDto.value,
      product: req["product"],
    } as AttributeDto);
  }

  @Post("/update")
  public async update(@Body() update: PatchAttributeDto, @Req() req: Request) {
    return await this.service.update({
      id: update.id,
      name: update.name,
      value: update.value,
      product: req["product"],
    });
  }

  @Delete("/delete")
  public delete(@Body() id: number) {
    return this.service.delete(id);
  }
}
