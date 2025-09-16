import { Body, Controller, Get, Post, Put, Req } from "@nestjs/common";
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
      name: true,
      colorCode: true,
      shapeType: true,
      part: true,
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
      name: createDto.name,
      colorCode: createDto.colorCode,
      image: createDto.image,
      shapeType: createDto.shapeType,
      part: createDto.part,
      createdBy: req["createdBy"],
    } as CreateShapeDto);
  }

  @Put("/update")
  @Roles("CEO", "TECH_SUPPORT", "STORE_MANAGER", "SUPER_ADMIN", "CONTENT_MANAGER", "SYSTEM_ADMIN")
  public async update(@Body() update: PatchShapeDto, @Req() req: Request) {
    return await this.service.update({
      id: update.id,
      type: update.type,
      name: update.name,
      colorCode: update.colorCode,
      image: update.image,
      shapeType: update.shapeType,
      part: update.part,
      createdBy: req["createdBy"],
    });
  }

  @Get("/grouped")
  public async getGroupedShapes() {
    return await this.service.getGroupedShapes();
  }

  @Post("/parts")
  public async getPartsByShapeAndPartType(@Body() body: { shapeId: string; partType: string }) {
    return await this.service.getPartsByShapeAndPartType(body.shapeId, body.partType);
  }
}
