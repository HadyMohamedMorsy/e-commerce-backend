import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import * as moment from "moment";
import { Category } from "src/categories/category.entity";
import { BaseService } from "src/shared/base/base";
import { APIFeaturesService } from "src/shared/filters/filter.service";
import { ICrudService } from "src/shared/interfaces/crud-service.interface";
import { Repository, SelectQueryBuilder } from "typeorm";
import { Blog } from "./blog.entity";
import { BlogDto, BlogFilterDto, BlogSortOrder } from "./dtos/create.dto";
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
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
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

    // Apply date filtering for published blogs
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
        views: true,
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

  async incrementViews(slug: string) {
    const blog = await this.repository.findOne({
      where: { slug },
      select: {
        id: true,
        views: true,
      },
    });

    if (!blog) {
      throw new NotFoundException(`Blog not found`);
    }

    const currentViews = blog.views || 0;
    const newViews = currentViews + 1;

    return await this.update({
      id: blog.id,
      views: newViews,
    });
  }

  async filterBlogs(filterDto: BlogFilterDto) {
    const {
      categorySlug,
      postType,
      isFeatured,
      isPublished,
      mediaType,
      search,
      length = 10,
      start = 0,
      sort = BlogSortOrder.DESC,
      sortBy = "createdAt",
    } = filterDto;

    const queryBuilder = this.buildFilterQuery(
      categorySlug,
      postType,
      isFeatured,
      isPublished,
      mediaType,
      search,
    );
    this.applyRelationsAndPagination(queryBuilder, start, length, sort, sortBy);

    const [data, totalRecords] = await queryBuilder.getManyAndCount();
    return this.response(data, totalRecords);
  }

  private buildFilterQuery(
    categorySlug?: string,
    postType?: string,
    isFeatured?: boolean,
    isPublished?: boolean,
    mediaType?: string,
    search?: string,
  ) {
    const queryBuilder = this.repository
      .createQueryBuilder("e")
      .leftJoin("e.categories", "categories")
      .leftJoin("e.createdBy", "createdBy");

    this.applyCategoryFilter(queryBuilder, categorySlug);
    this.applyBlogFilters(queryBuilder, postType, isFeatured, isPublished, mediaType);
    this.applySearchFilter(queryBuilder, search);

    return queryBuilder;
  }

  private async applyCategoryFilter(queryBuilder: any, categorySlug?: string) {
    if (categorySlug) {
      const category = await this.categoryRepository.findOne({
        where: { slug: categorySlug },
      });
      if (category) {
        queryBuilder.andWhere("categories.id = :categoryId", { categoryId: category.id });
      }
    }
  }

  private applyBlogFilters(
    queryBuilder: any,
    postType?: string,
    isFeatured?: boolean,
    isPublished?: boolean,
    mediaType?: string,
  ) {
    if (postType) {
      queryBuilder.andWhere("e.postType = :postType", { postType });
    }
    if (isFeatured !== undefined) {
      queryBuilder.andWhere("e.isFeatured = :isFeatured", { isFeatured });
    }
    if (isPublished !== undefined) {
      queryBuilder.andWhere("e.isPublished = :isPublished", { isPublished });
    }
    if (mediaType) {
      queryBuilder.andWhere("e.mediaType = :mediaType", { mediaType });
    }

    // Apply date filtering for published blogs (only show blogs within their date range)
    const now = moment().format("YYYY-MM-DD");
    queryBuilder.andWhere(
      "DATE(e.startDate) <= :now AND (DATE(e.endDate) >= :now OR e.endDate IS NULL)",
      {
        now,
      },
    );
  }

  private applySearchFilter(queryBuilder: any, search?: string) {
    if (search) {
      queryBuilder.andWhere(
        "(e.title LIKE :search OR e.description LIKE :search OR e.subTitle LIKE :search)",
        { search: `%${search}%` },
      );
    }
  }

  private applyRelationsAndPagination(
    queryBuilder: any,
    start: number,
    length: number,
    sort: BlogSortOrder = BlogSortOrder.DESC,
    sortBy: string = "createdAt",
  ) {
    this.queryRelationIndex(queryBuilder);
    queryBuilder
      .addSelect([
        "createdBy.id",
        "createdBy.firstName",
        "createdBy.lastName",
        "categories.id",
        "categories.name",
      ])
      .orderBy(`e.${sortBy}`, sort.toUpperCase())
      .skip(start)
      .take(length);
  }
}
