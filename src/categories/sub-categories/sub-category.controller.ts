import { Body, Controller, Post, Put, Req } from "@nestjs/common";
import { BaseController } from "src/shared/base/base.controller";
import { Roles } from "src/shared/decorators/roles.decorator";
import { RelationOptions, SelectOptions } from "src/shared/interfaces/query.interface";
import { SubCategoryDto } from "./dtos/create.dto";
import { PatchSubCategoryDto } from "./dtos/patch.dto";
import { SubCategory } from "./sub-category.entity";
import { SubCategoryService } from "./sub-category.service";

@Controller("sub-category")
export class SubCategoryController
  extends BaseController<SubCategory, SubCategoryDto, PatchSubCategoryDto>
  implements SelectOptions, RelationOptions
{
  constructor(protected readonly service: SubCategoryService) {
    super(service);
  }

  public selectOptions(): Record<string, boolean> {
    return {
      id: true,
      created_at: true,
      updated_at: true,
      name: true,
      description: true,
      image: true,
      categoryType: true,
      slug: true,
      icon: true,
    };
  }

  public getRelationOptions(): Record<string, any> {
    return {
      createdBy: {
        id: true,
        firstName: true,
        lastName: true,
      },
      category: {
        id: true,
        name: true,
      },
    };
  }

  @Post("/store")
  @Roles("CEO", "TECH_SUPPORT", "STORE_MANAGER", "SUPER_ADMIN", "CONTENT_MANAGER", "SYSTEM_ADMIN")
  public create(@Body() create: SubCategoryDto, @Req() req: Request) {
    return this.service.create(
      {
        name: create.name,
        description: create.description,
        image: create.image,
        categoryType: create.categoryType,
        category: req["category"],
        slug: create.slug,
        icon: create.icon,
        createdBy: req["createdBy"],
      } as SubCategoryDto,
      this.selectOptions(),
      this.getRelationOptions(),
    );
  }

  @Put("/update")
  @Roles("CEO", "TECH_SUPPORT", "STORE_MANAGER", "SUPER_ADMIN", "CONTENT_MANAGER", "SYSTEM_ADMIN")
  public async update(@Body() update: PatchSubCategoryDto, @Req() req: Request) {
    return await this.service.update(
      {
        id: update.id,
        name: update.name,
        description: update.description,
        image: update.image,
        categoryType: update.categoryType,
        category: req["category"],
        slug: update.slug,
        icon: update.icon,
        createdBy: req["createdBy"],
      },
      this.selectOptions(),
      this.getRelationOptions(),
    );
  }
}
