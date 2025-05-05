// list.service.ts
import { Injectable } from "@nestjs/common";
import { CategoryService } from "src/categories/category.service";
import { CategoryType } from "../enum/global-enum";
import {
  getArticleTypeList,
  getCategoryTypeList,
  getFaqList,
  getMediaTypeList,
  getRoleList,
  getWeight,
} from "../utilties/get-flobal-list-from-enum.utils";

@Injectable()
export class ListService {
  constructor(private readonly categoryService: CategoryService) {}
  private lists = {
    roles: getRoleList(),
    faq: getFaqList(),
    weight: getWeight(),
    mediaType: getMediaTypeList(),
    articleType: getArticleTypeList(),
    categoryType: getCategoryTypeList(),
  };

  async getListsBySlug(slug: string) {
    switch (slug) {
      case "user":
        return {
          roles: this.lists.roles,
        };
      case "faq":
        return {
          faq: this.lists.faq,
        };
      case "shipment":
        return {
          weight: this.lists.weight,
        };
      case "category":
        return {
          categoryType: this.lists.categoryType,
        };
      case "blog":
        return {
          category: await this.categoryService.getCategoriesByType(CategoryType.BLOG),
          mediaType: this.lists.mediaType,
          articleType: this.lists.articleType,
        };
      case "product":
        return {
          category: await this.categoryService.getCategoriesByType(CategoryType.PRODUCT),
        };
      default:
        throw new Error(`Slug "${slug}" not supported`);
    }
  }
}
