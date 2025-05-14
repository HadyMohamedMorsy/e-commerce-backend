import { Body, Controller, Post, Put, Req } from "@nestjs/common";
import { BaseController } from "src/shared/base/base.controller";
import { Roles } from "src/shared/decorators/roles.decorator";
import { RelationOptions, SelectOptions } from "src/shared/interfaces/query.interface";
import { Attribute } from "./attribute.entity";
import { AttributeService } from "./attribute.service";
import { AttributeDto, IAttribute } from "./dtos/create.dto";
import { PatchAttributeDto } from "./dtos/patch.dto";

@Controller("attribute")
export class AttributeController
  extends BaseController<Attribute, IAttribute, PatchAttributeDto>
  implements SelectOptions, RelationOptions
{
  constructor(protected readonly service: AttributeService) {
    super(service);
  }

  public selectOptions(): Record<string, boolean> {
    return {
      id: true,
      name: true,
      value: true,
      priceChange: true,
      quantity: true,
      images: true,
      image: true,
      isActive: true,
    };
  }

  public getRelationOptions(): Record<string, any> {
    return {
      product: {
        id: true,
        name: true,
      },
    };
  }

  @Post("/store")
  @Roles("CEO", "TECH_SUPPORT", "STORE_MANAGER", "SUPER_ADMIN", "CONTENT_MANAGER", "SYSTEM_ADMIN")
  public async create(@Body() createDtos: AttributeDto, @Req() req: Request) {
    const attributesToCreate = createDtos.attributes.map(
      createDto =>
        ({
          name: createDto.name,
          value: createDto.value,
          priceChange: createDto.priceChange,
          quantity: createDto.quantity,
          images: createDto.images,
          image: createDto.image,
          product: req["product"],
        }) as IAttribute,
    );

    return await Promise.all(attributesToCreate.map(attribute => this.service.create(attribute)));
  }

  @Put("/update")
  @Roles("CEO", "TECH_SUPPORT", "STORE_MANAGER", "SUPER_ADMIN", "CONTENT_MANAGER", "SYSTEM_ADMIN")
  public async update(@Body() updates: PatchAttributeDto[], @Req() req: Request) {
    const attributesToUpdate = updates.map(update => ({
      id: update.id,
      name: update.name,
      priceChange: update.priceChange,
      quantity: update.quantity,
      images: update.images,
      value: update.value,
      image: update.image,
      product: req["product"],
    }));

    return await Promise.all(attributesToUpdate.map(attribute => this.service.update(attribute)));
  }

  @Put("/change-status")
  @Roles("CEO", "TECH_SUPPORT", "STORE_MANAGER", "SUPER_ADMIN", "CONTENT_MANAGER", "SYSTEM_ADMIN")
  public changeStatus(@Body() update: { id: number; isActive: boolean }) {
    return this.service.changeStatus(update.id, update.isActive, "isActive", {
      id: true,
      isActive: true,
    });
  }
}
