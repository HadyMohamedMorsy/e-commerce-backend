import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { BaseService } from "src/shared/base/base";
import { APIFeaturesService } from "src/shared/filters/filter.service";
import { ICrudService } from "src/shared/interfaces/crud-service.interface";
import { Repository, SelectQueryBuilder } from "typeorm";
import { ProductDto } from "./dtos/create.dto";
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
    const product = await this.repository.findOne({
      where: { slug },
      relations: [
        "categories",
        "sku",
        "reviews",
        "reviews.createdBy",
        "specifications",
        "attributes",
        "createdBy",
      ],
    });

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
