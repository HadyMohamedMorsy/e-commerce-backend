import { Body, Controller, Delete, HttpCode, Post, Req } from "@nestjs/common";
import { Roles } from "src/shared/decorators/roles.decorator";
import { AttributeService } from "./attribute.service";
import { AttributeDto } from "./dtos/create.dto";
import { PatchAttributeDto } from "./dtos/patch.dto";

@Controller("attribute")
export class AttributeController {
  constructor(private readonly service: AttributeService) {}

  @Post("/index")
  @HttpCode(200)
  @Roles("CEO", "TECH_SUPPORT", "STORE_MANAGER", "SUPER_ADMIN", "CONTENT_MANAGER", "SYSTEM_ADMIN")
  public index(@Body() filter: any) {
    return this.service.findAll(filter);
  }

  @Post("/store")
  @Roles("CEO", "TECH_SUPPORT", "STORE_MANAGER", "SUPER_ADMIN", "CONTENT_MANAGER", "SYSTEM_ADMIN")
  public create(@Body() createDto: AttributeDto, @Req() req: Request) {
    return this.service.create({
      name: createDto.name,
      value: createDto.value,
      product: req["product"],
    } as AttributeDto);
  }

  @Post("/update")
  @Roles("CEO", "TECH_SUPPORT", "STORE_MANAGER", "SUPER_ADMIN", "CONTENT_MANAGER", "SYSTEM_ADMIN")
  public async update(@Body() update: PatchAttributeDto, @Req() req: Request) {
    return await this.service.update({
      id: update.id,
      name: update.name,
      value: update.value,
      product: req["product"],
    });
  }

  @Delete("/delete")
  @Roles("CEO", "TECH_SUPPORT", "STORE_MANAGER", "SUPER_ADMIN", "CONTENT_MANAGER", "SYSTEM_ADMIN")
  public delete(@Body() id: number) {
    return this.service.delete(id);
  }
}
