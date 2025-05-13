import { Body, Controller, Post, Put, Req } from "@nestjs/common";
import { BaseController } from "src/shared/base/base.controller";
import { Roles } from "src/shared/decorators/roles.decorator";
import { RelationOptions, SelectOptions } from "src/shared/interfaces/query.interface";
import { CreateShapeDto } from "./dtos/create-shape.dto";
import { PatchShapeDto } from "./dtos/patch-shape.dto";
import { Shape } from "./shapes.entity";
import { ShapesService } from "./shapes.service";

@Controller("shapes")
export class ShapesController
  extends BaseController<Shape, CreateShapeDto, PatchShapeDto>
  implements SelectOptions, RelationOptions
{
  constructor(protected readonly service: ShapesService) {
    super(service);
  }

  public selectOptions(): Record<string, boolean> {
    return {
      id: true,
      created_at: true,
      updated_at: true,
      type: true,
      image: true,
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
  public create(@Body() createDto: CreateShapeDto, @Req() req: Request) {
    return this.service.create({
      type: createDto.type,
      image: createDto.image,
      createdBy: req["createdBy"],
    } as CreateShapeDto);
  }

  @Put("/update")
  @Roles("CEO", "TECH_SUPPORT", "STORE_MANAGER", "SUPER_ADMIN", "CONTENT_MANAGER", "SYSTEM_ADMIN")
  public async update(@Body() update: PatchShapeDto, @Req() req: Request) {
    return await this.service.update({
      id: update.id,
      type: update.type,
      image: update.image,
      createdBy: req["createdBy"],
    });
  }
}
