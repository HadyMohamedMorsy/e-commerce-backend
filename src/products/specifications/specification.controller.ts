import { Body, Controller, Post, Put, Req } from "@nestjs/common";
import { BaseController } from "src/shared/base/base.controller";
import { Roles } from "src/shared/decorators/roles.decorator";
import { RelationOptions, SelectOptions } from "src/shared/interfaces/query.interface";
import { CreateSpecificationDto } from "./dtos/create-specification.dto";
import { UpdateSpecificationDto } from "./dtos/update-specification.dto";
import { Specification } from "./specification.entity";
import { SpecificationService } from "./specification.service";

@Controller("specification")
export class SpecificationController
  extends BaseController<Specification, CreateSpecificationDto, UpdateSpecificationDto>
  implements SelectOptions, RelationOptions
{
  constructor(protected readonly service: SpecificationService) {
    super(service);
  }

  public selectOptions(): Record<string, boolean> {
    return {
      id: true,
      createdAt: true,
      updatedAt: true,
      title: true,
      attributes: true,
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
  public create(@Body() create: CreateSpecificationDto, @Req() req: Request) {
    return this.service.create(
      {
        title: create.title,
        attributes: create.attributes,
        product: req["product"],
      },
      this.selectOptions(),
      this.getRelationOptions(),
    );
  }

  @Put("/update")
  @Roles("CEO", "TECH_SUPPORT", "STORE_MANAGER", "SUPER_ADMIN", "CONTENT_MANAGER", "SYSTEM_ADMIN")
  public async update(@Body() update: UpdateSpecificationDto, @Req() req: Request) {
    return await this.service.update(
      {
        id: update.id,
        title: update.title,
        attributes: update.attributes,
        product: req["product"],
      },
      this.selectOptions(),
      this.getRelationOptions(),
    );
  }
}
