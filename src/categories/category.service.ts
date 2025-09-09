import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { BaseService } from "src/shared/base/base";
import { CategoryType } from "src/shared/enum/global-enum";
import { APIFeaturesService } from "src/shared/filters/filter.service";
import { ICrudService } from "src/shared/interfaces/crud-service.interface";
import { Repository } from "typeorm";
import { Category } from "./category.entity";
import { CategoryDto } from "./dtos/create.dto";
import { PatchCategoryDto } from "./dtos/patch.dto";

@Injectable()
export class CategoryService
  extends BaseService<Category, CategoryDto, PatchCategoryDto>
  implements ICrudService<Category, CategoryDto, PatchCategoryDto>
{
  constructor(
    apiFeaturesService: APIFeaturesService,
    @InjectRepository(Category)
    repository: Repository<Category>,
  ) {
    super(repository, apiFeaturesService);
  }

  async getCategoriesByType(type: CategoryType) {
    const categories = await this.repository.find({
      where: { categoryType: type },
      select: ["id", "name"],
    });

    return categories.map(category => ({
      label: category.name,
      value: category.id,
    }));
  }

  override async delete({ id }: any) {
    const category = await this.repository.findOne({
      where: { id },
      relations: ["products", "blogs"],
    });

    if (!category) {
      throw new Error("Category not found");
    }

    if (category.products && category.products.length > 0) {
      await this.repository
        .createQueryBuilder()
        .relation(Category, "products")
        .of(category)
        .remove(category.products);
    }

    if (category.blogs && category.blogs.length > 0) {
      await this.repository
        .createQueryBuilder()
        .relation(Category, "blogs")
        .of(category)
        .remove(category.blogs);
    }

    // مسح الـ category نهائياً
    await this.repository.remove(category);
    return { deleted: true, id };
  }
}
