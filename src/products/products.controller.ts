import { Body, Controller, Get, Param, Post, Put, Req } from "@nestjs/common";
import { BaseController } from "src/shared/base/base.controller";
import { Auth } from "src/shared/decorators/auth.decorator";
import { Roles } from "src/shared/decorators/roles.decorator";
import { AuthType } from "src/shared/enum/global-enum";
import { RelationOptions, SelectOptions } from "src/shared/interfaces/query.interface";
import { ProductDto } from "./dtos/create.dto";
import { PatchProductDto } from "./dtos/patch.dto";
import { Product } from "./products.entity";
import { ProductService } from "./products.service";

@Controller("product")
export class ProductController
  extends BaseController<Product, ProductDto, PatchProductDto>
  implements SelectOptions, RelationOptions
{
  constructor(protected readonly service: ProductService) {
    super(service);
  }
  selectOptions(): Record<string, boolean> {
    return {
      id: true,
      name: true,
      description: true,
      summary: true,
      images: true,
      metaTitle: true,
      metaDescription: true,
      cover: true,
    };
  }

  getRelationOptions(): Record<string, any> {
    return {
      createdBy: {
        id: true,
        firstName: true,
        lastName: true,
      },
    };
  }

  @Get("/by-slug/:slug")
  @Auth(AuthType.None)
  async getProductBySlug(@Param("slug") slug: string) {
    return this.service.getProductBySlug(slug);
  }

  @Post("/store")
  @Roles("CEO", "TECH_SUPPORT", "STORE_MANAGER", "SUPER_ADMIN", "CONTENT_MANAGER", "SYSTEM_ADMIN")
  public create(@Body() createDto: ProductDto, @Req() req: Request) {
    return this.service.create({
      name: createDto.name,
      description: createDto.description,
      summary: createDto.summary,
      slug: createDto.slug,
      metaTitle: createDto.metaTitle,
      images: createDto.images,
      metaDescription: createDto.metaDescription,
      cover: createDto.cover,
      categories: req["categories"],
      createdBy: req["createdBy"],
    } as ProductDto);
  }

  @Put("/update")
  @Roles("CEO", "TECH_SUPPORT", "STORE_MANAGER", "SUPER_ADMIN", "CONTENT_MANAGER", "SYSTEM_ADMIN")
  public async update(@Body() update: PatchProductDto, @Req() req: Request) {
    return await this.service.update({
      id: update.id,
      name: update.name,
      description: update.description,
      summary: update.summary,
      cover: update.cover,
      product: req["product"],
      slug: update.slug,
      images: update.images,
      metaTitle: update.metaTitle,
      metaDescription: update.metaDescription,
      categories: req["categories"],
      createdBy: req["createdBy"],
    });
  }
}
