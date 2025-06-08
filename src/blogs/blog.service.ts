import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import * as moment from "moment";
import { BaseService } from "src/shared/base/base";
import { APIFeaturesService } from "src/shared/filters/filter.service";
import { ICrudService } from "src/shared/interfaces/crud-service.interface";
import { Repository, SelectQueryBuilder } from "typeorm";
import { Blog } from "./blog.entity";
import { BlogDto } from "./dtos/create.dto";
import { PatchBlogDto } from "./dtos/patch.dto";

@Injectable()
export class BlogsService
  extends BaseService<Blog, BlogDto, PatchBlogDto>
  implements ICrudService<Blog, BlogDto, PatchBlogDto>
{
  constructor(
    apiFeaturesService: APIFeaturesService,
    @InjectRepository(Blog)
    repository: Repository<Blog>,
  ) {
    super(repository, apiFeaturesService);
  }

  protected override queryRelationIndex(
    queryBuilder?: SelectQueryBuilder<Blog>,
    filteredRecord?: any,
  ): void {
    super.queryRelationIndex(queryBuilder, filteredRecord);
    queryBuilder
      .leftJoin("e.categories", "categories")
      .addSelect(["categories.id", "categories.name"]);
  }

  async updateBlog(
    updateDto: PatchBlogDto & { blog: Blog },
    selectOptions?: Record<string, boolean>,
    relationOptions?: Record<string, any>,
  ): Promise<Blog> {
    const blog = updateDto.blog;

    Object.assign(blog, {
      title: updateDto.title,
      subTitle: updateDto.subTitle,
      postType: updateDto.postType,
      slug: updateDto.slug,
      description: updateDto.description,
      shortDescription: updateDto.shortDescription,
      metaTitle: updateDto.metaTitle,
      metaDescription: updateDto.metaDescription,
      featuredImages: updateDto.featuredImages,
      thumb: updateDto.thumb,
      mediaType: updateDto.mediaType,
      video: updateDto.video,
      isFeatured: updateDto.isFeatured,
      isPublished: updateDto.isPublished,
      startDate: updateDto.startDate,
      endDate: updateDto.endDate,
      order: updateDto.order,
      categories: updateDto.categories,
    });

    const record = await this.repository.save(blog);
    return this.findOne(record.id, selectOptions, relationOptions);
  }

  protected override applyFilters(
    queryBuilder: SelectQueryBuilder<Blog>,
    filters: Record<string, any>,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    customFilters?: Record<string, any>,
  ) {
    queryBuilder = super.applyFilters(queryBuilder, filters);
    const now = moment().format("YYYY-MM-DD");
    queryBuilder.andWhere(
      "DATE(e.startDate) <= :now AND (DATE(e.endDate) >= :now OR e.endDate IS NULL)",
      {
        now,
      },
    );
    return queryBuilder;
  }

  async getBlogBySlugWithRelated(slug: string) {
    const blog = await this.repository.findOne({
      where: { slug },
      relations: ["categories", "createdBy"],
      select: {
        id: true,
        createdAt: true,
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
        mediaType: true,
        createdBy: {
          id: true,
          firstName: true,
          lastName: true,
        },
        categories: {
          id: true,
          name: true,
        },
      },
    });

    if (!blog) {
      throw new NotFoundException(`Blog with slug ${slug} not found`);
    }

    const categoryIds = blog.categories.map(category => category.id);
    const relatedBlogs = await this.repository
      .createQueryBuilder("blog")
      .leftJoin("blog.categories", "categories")
      .addSelect(["categories.id", "categories.name"])
      .leftJoin("blog.createdBy", "createdBy")
      .addSelect(["createdBy.id", "createdBy.firstName", "createdBy.lastName"])
      .where("blog.id != :currentBlogId", { currentBlogId: blog.id })
      .andWhere("blog.isPublished = :isPublished", { isPublished: true })
      .andWhere("categories.id IN (:...categoryIds)", { categoryIds })
      .take(2)
      .getMany();

    return {
      data: {
        blog,
        relatedBlogs,
      },
    };
  }
}
