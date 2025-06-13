import { Body, Controller, Get, Param, Patch, Post, Put, Req } from "@nestjs/common";
import { BaseController } from "src/shared/base/base.controller";
import { Auth } from "src/shared/decorators/auth.decorator";
import { Roles } from "src/shared/decorators/roles.decorator";
import { AuthType } from "src/shared/enum/global-enum";
import { RelationOptions, SelectOptions } from "src/shared/interfaces/query.interface";
import { Blog } from "./blog.entity";
import { BlogsService } from "./blog.service";
import { BlogDto } from "./dtos/create.dto";
import { PatchBlogDto } from "./dtos/patch.dto";

@Controller("blog")
export class BlogController
  extends BaseController<Blog, BlogDto, PatchBlogDto>
  implements SelectOptions, RelationOptions
{
  constructor(protected readonly service: BlogsService) {
    super(service);
  }

  public selectOptions(): Record<string, boolean> {
    return {
      id: true,
      created_at: true,
      updated_at: true,
      title: true,
      description: true,
      subTitle: true,
      postType: true,
      slug: true,
      startDate: true,
      endDate: true,
      shortDescription: true,
      metaTitle: true,
      metaDescription: true,
      featuredImages: true,
      thumb: true,
      video: true,
      mediaType: true,
      isFeatured: true,
      isPublished: true,
      order: true,
    };
  }

  public getRelationOptions(): Record<string, any> {
    return {
      createdBy: {
        id: true,
        firstName: true,
        lastName: true,
      },
      categories: {
        id: true,
        name: true,
      },
    };
  }

  @Post("/store")
  @Roles("CEO", "TECH_SUPPORT", "STORE_MANAGER", "SUPER_ADMIN", "CONTENT_MANAGER", "SYSTEM_ADMIN")
  public create(@Body() createDto: BlogDto, @Req() req: Request) {
    return this.service.create(
      {
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
        video: createDto.video,
        mediaType: createDto.mediaType,
        categories: req["categories"],
        createdBy: req["createdBy"],
      },
      this.selectOptions(),
      this.getRelationOptions(),
    );
  }

  @Put("/update")
  @Roles("CEO", "TECH_SUPPORT", "STORE_MANAGER", "SUPER_ADMIN", "CONTENT_MANAGER", "SYSTEM_ADMIN")
  public async update(@Body() update: PatchBlogDto, @Req() req: Request) {
    return await this.service.updateBlog(
      {
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
        video: update.video,
        blog: req["blog"],
        categories: req["categories"],
        createdBy: req["createdBy"],
      },
      this.selectOptions(),
      this.getRelationOptions(),
    );
  }

  @Patch("/change-published-status")
  @Roles("CEO", "TECH_SUPPORT", "STORE_MANAGER", "SUPER_ADMIN", "CONTENT_MANAGER", "SYSTEM_ADMIN")
  public async changePublishedStatus(@Body() data: { id: number; isPublished: boolean }) {
    return await this.service.update({
      id: data.id,
      isPublished: data.isPublished,
    });
  }

  @Patch("/change-featured-status")
  @Roles("CEO", "TECH_SUPPORT", "STORE_MANAGER", "SUPER_ADMIN", "CONTENT_MANAGER", "SYSTEM_ADMIN")
  public async changeFeaturedStatus(@Body() data: { id: number; isFeatured: boolean }) {
    return await this.service.update({
      id: data.id,
      isFeatured: data.isFeatured,
    });
  }

  @Get("/by-slug/:slug")
  @Auth(AuthType.None)
  public async getBlogBySlugWithRelated(@Param("slug") slug: string) {
    return await this.service.getBlogBySlugWithRelated(slug);
  }
}
