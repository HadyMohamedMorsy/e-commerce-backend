import { Body, Controller, Delete, HttpCode, Post, Put, Req } from "@nestjs/common";
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
  public async create(@Body() createDtos: AttributeDto[], @Req() req: Request) {
    const attributesToCreate = createDtos.map(
      createDto =>
        ({
          name: createDto.name,
          value: createDto.value,
          image: createDto.image,
          product: req["product"],
        }) as AttributeDto,
    );

    return await Promise.all(attributesToCreate.map(attribute => this.service.create(attribute)));
  }

  @Put("/update")
  @Roles("CEO", "TECH_SUPPORT", "STORE_MANAGER", "SUPER_ADMIN", "CONTENT_MANAGER", "SYSTEM_ADMIN")
  public async update(@Body() updates: PatchAttributeDto[], @Req() req: Request) {
    const attributesToUpdate = updates.map(update => ({
      id: update.id,
      name: update.name,
      value: update.value,
      image: update.image,
      product: req["product"],
    }));

    return await Promise.all(attributesToUpdate.map(attribute => this.service.update(attribute)));
  }

  @Delete("/delete")
  @Roles("CEO", "TECH_SUPPORT", "STORE_MANAGER", "SUPER_ADMIN", "CONTENT_MANAGER", "SYSTEM_ADMIN")
  public delete(@Body() id: number) {
    return this.service.delete(id);
  }
}
