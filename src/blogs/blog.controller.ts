import { Body, Controller, Delete, HttpCode, Post, Req } from "@nestjs/common";
import { Roles } from "src/shared/decorators/roles.decorator";
import { BlogsService } from "./blog.service";
import { BlogDto } from "./dtos/create.dto";
import { PatchBlogDto } from "./dtos/patch.dto";

@Controller("blog")
export class BlogController {
  constructor(private readonly service: BlogsService) {}

  @Post("/index")
  @Roles(
    "CEO",
    "TECH_SUPPORT",
    "STORE_MANAGER",
    "SUPER_ADMIN",
    "INVENTORY_MANAGER",
    "CONTENT_MANAGER",
    "SYSTEM_ADMIN",
  )
  @HttpCode(200)
  public index(@Body() filter: any) {
    return this.service.findAll(filter);
  }

  @Post("/store")
  @Roles("CEO", "TECH_SUPPORT", "STORE_MANAGER", "SUPER_ADMIN", "CONTENT_MANAGER", "SYSTEM_ADMIN")
  public create(@Body() createDto: BlogDto, @Req() req: Request) {
    return this.service.create({
      order: createDto.order,
      isFeatured: createDto.isFeatured,
      isPublished: createDto.isPublished,
      title: createDto.title,
      description: createDto.description,
      subTitle: createDto.subTitle,
      postType: createDto.postType,
      slug: createDto.slug,
      startDate: createDto.startDate,
      endDate: createDto.endDate,
      shortDescription: createDto.shortDescription,
      metaTitle: createDto.metaTitle,
      metaDescription: createDto.metaDescription,
      featuredImages: createDto.featuredImages,
      thumb: createDto.thumb,
      mediaType: createDto.mediaType,
      categories: req["categories"],
      createdBy: req["createdBy"],
    });
  }

  @Post("/update")
  @Roles("CEO", "TECH_SUPPORT", "STORE_MANAGER", "SUPER_ADMIN", "CONTENT_MANAGER", "SYSTEM_ADMIN")
  public async update(@Body() update: PatchBlogDto, @Req() req: Request) {
    return await this.service.update({
      id: update.id,
      order: update.order,
      isFeatured: update.isFeatured,
      isPublished: update.isPublished,
      title: update.title,
      description: update.description,
      subTitle: update.subTitle,
      postType: update.postType,
      slug: update.slug,
      startDate: update.startDate,
      endDate: update.endDate,
      shortDescription: update.shortDescription,
      metaTitle: update.metaTitle,
      metaDescription: update.metaDescription,
      featuredImages: update.featuredImages,
      thumb: update.thumb,
      mediaType: update.mediaType,
      categories: req["categories"],
      createdBy: req["createdBy"],
    });
  }

  @Post("/change-published-status")
  @Roles("CEO", "TECH_SUPPORT", "STORE_MANAGER", "SUPER_ADMIN", "CONTENT_MANAGER", "SYSTEM_ADMIN")
  @HttpCode(200)
  public async changePublishedStatus(@Body() data: { id: number; isPublished: boolean }) {
    return await this.service.update({
      id: data.id,
      isPublished: data.isPublished,
    });
  }

  @Post("/change-featured-status")
  @Roles("CEO", "TECH_SUPPORT", "STORE_MANAGER", "SUPER_ADMIN", "CONTENT_MANAGER", "SYSTEM_ADMIN")
  @HttpCode(200)
  public async changeFeaturedStatus(@Body() data: { id: number; isFeatured: boolean }) {
    return await this.service.update({
      id: data.id,
      isFeatured: data.isFeatured,
    });
  }

  @Delete("/delete")
  @Roles("STORE_MANAGER", "SUPER_ADMIN", "CONTENT_MANAGER", "CEO", "SYSTEM_ADMIN")
  public delete(@Body() id: number) {
    return this.service.delete(id);
  }
}
