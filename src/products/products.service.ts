import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Category } from "src/categories/category.entity";
import { SubCategory } from "src/categories/sub-categories/sub-category.entity";
import { BaseService } from "src/shared/base/base";
import { APIFeaturesService } from "src/shared/filters/filter.service";
import { ICrudService } from "src/shared/interfaces/crud-service.interface";
import { Repository, SelectQueryBuilder } from "typeorm";
import { ProductDto, ProductFilterDto, SortOrder } from "./dtos/create.dto";
import { PatchProductDto } from "./dtos/patch.dto";
import { Product } from "./products.entity";

@Injectable()
export class ProductService
  extends BaseService<Product, ProductDto, PatchProductDto>
  implements ICrudService<Product, ProductDto, PatchProductDto>
{
  constructor(
    apiFeaturesService: APIFeaturesService,
    @InjectRepository(Product)
    repository: Repository<Product>,
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
    @InjectRepository(SubCategory)
    private subCategoryRepository: Repository<SubCategory>,
  ) {
    super(repository, apiFeaturesService);
  }

  override async update(
    updateDto: PatchProductDto & { product: Product },
    selectOptions?: Record<string, boolean>,
    relationOptions?: Record<string, any>,
  ) {
    const product = updateDto.product;

    Object.assign(product, {
      name: updateDto.name,
      slug: updateDto.slug,
      description: updateDto.description,
      metaTitle: updateDto.metaTitle,
      metaDescription: updateDto.metaDescription,
      summary: updateDto.summary,
      images: updateDto.images,
      cover: updateDto.cover,
      categories: updateDto.categories,
      createdBy: updateDto.createdBy,
    });

    const record = await this.repository.save(product);
    return this.findOne(record.id, selectOptions, relationOptions);
  }

  async getProductBySlug(slug: string) {
    const product = await this.repository
      .createQueryBuilder("product")
      .leftJoinAndSelect("product.categories", "categories")
      .leftJoinAndSelect("product.sku", "sku")
      .leftJoinAndSelect("product.specifications", "specifications")
      .leftJoinAndSelect("product.attributes", "attributes")
      .leftJoinAndSelect("product.faq", "faqs")
      .leftJoinAndSelect("product.createdBy", "createdBy")
      .leftJoinAndSelect("product.reviews", "reviews", "reviews.isApproved = :isApproved", {
        isApproved: true,
      })
      .leftJoinAndSelect("reviews.createdBy", "reviewCreatedBy")
      .where("product.slug = :slug", { slug })
      .getOne();

    if (!product) return null;

    const categoryIds = product.categories.map(category => category.id);
    const relatedProducts = await this.repository
      .createQueryBuilder("product")
      .leftJoinAndSelect("product.categories", "categories")
      .leftJoinAndSelect("product.sku", "sku")
      .where("product.id != :productId", { productId: product.id })
      .andWhere("categories.id IN (:...categoryIds)", { categoryIds })
      .take(5)
      .getMany();

    return {
      data: {
        product,
        relatedProducts,
      },
    };
  }

  async findProductBySlug(slug: string) {
    return await this.repository.findOne({
      where: { slug },
    });
  }

  async filterProducts(filterDto: ProductFilterDto) {
    const {
      categorySlug,
      minPrice,
      maxPrice,
      length = 10,
      start = 0,
      sort = SortOrder.ASC,
    } = filterDto;

    const categoryInfo = await this.findCategoryInfoBySlug(categorySlug);
    if (!categoryInfo) return this.response([], 0);

    const queryBuilder = this.buildFilterQuery(categoryInfo, minPrice, maxPrice);
    this.applyRelationsAndPagination(queryBuilder, start, length, sort);

    const [data, totalRecords] = await queryBuilder.getManyAndCount();
    return this.response(data, totalRecords);
  }

  private buildFilterQuery(
    categoryInfo: { categoryId: number; isSubCategory: boolean },
    minPrice?: number,
    maxPrice?: number,
  ) {
    const queryBuilder = this.repository
      .createQueryBuilder("e")
      .leftJoin("e.categories", "categories")
      .leftJoin("e.sku", "sku");

    this.applyCategoryFilter(queryBuilder, categoryInfo);
    this.applyPriceFilters(queryBuilder, minPrice, maxPrice);

    return queryBuilder;
  }

  private applyCategoryFilter(
    queryBuilder: any,
    categoryInfo: { categoryId: number; isSubCategory: boolean },
  ) {
    if (categoryInfo.isSubCategory) {
      queryBuilder
        .leftJoin("categories.subCategories", "subCategories")
        .where("subCategories.id = :subCategoryId", { subCategoryId: categoryInfo.categoryId });
    } else {
      queryBuilder.where("categories.id = :categoryId", { categoryId: categoryInfo.categoryId });
    }
  }

  private applyPriceFilters(queryBuilder: any, minPrice?: number, maxPrice?: number) {
    if (minPrice) {
      queryBuilder.andWhere("sku.price >= :minPrice", { minPrice });
    }
    if (maxPrice) {
      queryBuilder.andWhere("sku.price <= :maxPrice", { maxPrice });
    }
  }

  private applyRelationsAndPagination(
    queryBuilder: any,
    start: number,
    length: number,
    sort: SortOrder = SortOrder.ASC,
  ) {
    this.queryRelationIndex(queryBuilder);
    queryBuilder
      .leftJoinAndSelect("e.sku", "productSku")
      .addSelect(["productSku.price", "productSku.quantity", "productSku.isOutOfStock"])
      .orderBy("productSku.price", sort.toUpperCase())
      .skip(start)
      .take(length);
  }

  private async findCategoryInfoBySlug(
    categorySlug: string,
  ): Promise<{ categoryId: number; isSubCategory: boolean } | null> {
    const [parentCategory, subCategory] = await Promise.all([
      this.categoryRepository.findOne({
        where: { slug: categorySlug },
        select: ["id"],
      }),
      this.subCategoryRepository.findOne({
        where: { slug: categorySlug },
        select: ["id"],
      }),
    ]);

    return parentCategory
      ? { categoryId: parentCategory.id, isSubCategory: false }
      : subCategory
        ? { categoryId: subCategory.id, isSubCategory: true }
        : null;
  }

  protected override queryRelationIndex(
    queryBuilder?: SelectQueryBuilder<Product>,
    filteredRecord?: any,
  ): void {
    super.queryRelationIndex(queryBuilder, filteredRecord);
    queryBuilder
      .leftJoin("e.categories", "categories")
      .addSelect(["categories.id", "categories.name"]);
  }
}
