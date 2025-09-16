import { Body, Controller, Get, Post, Put, Req } from "@nestjs/common";
import { BaseController } from "src/shared/base/base.controller";
import { Roles } from "src/shared/decorators/roles.decorator";
import { RelationOptions, SelectOptions } from "src/shared/interfaces/query.interface";
import { CreateShapeCategoryDto } from "./dtos/create.dto";
import { GroupedShapeCategoryResponseDto } from "./dtos/grouped-response.dto";
import { PatchShapeCategoryDto } from "./dtos/patch.dto";
import { ShapeCategory } from "./shape-categories.entity";
import { ShapeCategoryService } from "./shape-categories.service";

@Controller("shape-categories")
export class ShapeCategoryController
  extends BaseController<ShapeCategory, CreateShapeCategoryDto, PatchShapeCategoryDto>
  implements SelectOptions, RelationOptions
{
  constructor(protected readonly service: ShapeCategoryService) {
    super(service);
  }

  public selectOptions(): Record<string, boolean> {
    return {
      id: true,
      created_at: true,
      updated_at: true,
      type: true,
      shapeType: true,
      part: true,
      name: true,
      shapes: true,
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
      shapes: {
        id: true,
        type: true,
        image: true,
      },
    };
  }

  @Post("/store")
  @Roles("CEO", "TECH_SUPPORT", "STORE_MANAGER", "SUPER_ADMIN", "CONTENT_MANAGER", "SYSTEM_ADMIN")
  public create(@Body() createDto: CreateShapeCategoryDto, @Req() req: Request) {
    return this.service.create({
      type: createDto.type,
      shapeType: createDto.shapeType,
      name: createDto.name,
      part: createDto.part,
      createdBy: req["createdBy"],
    } as CreateShapeCategoryDto);
  }

  @Put("/update")
  @Roles("CEO", "TECH_SUPPORT", "STORE_MANAGER", "SUPER_ADMIN", "CONTENT_MANAGER", "SYSTEM_ADMIN")
  public async update(@Body() update: PatchShapeCategoryDto, @Req() req: Request) {
    return await this.service.update({
      id: update.id,
      type: update.type,
      shapeType: update.shapeType,
      name: update.name,
      part: update.part,
      createdBy: req["createdBy"],
    });
  }

  @Get("/grouped")
  public async getGroupedShapeCategories(): Promise<GroupedShapeCategoryResponseDto[]> {
    return await this.service.getGroupedShapeCategories();
  }

  @Post("/find-by-name")
  public async findShapeCategoriesByName(@Body() body: { name: string }) {
    return await this.service.findShapesByName(body.name);
  }
}
