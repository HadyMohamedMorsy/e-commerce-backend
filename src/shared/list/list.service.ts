import { ShapeCategoryService } from "./../../shape-categories/shape-categories.service";
// list.service.ts
import { Injectable } from "@nestjs/common";
import { BookService } from "src/books/book.service";
import { CategoryService } from "src/categories/category.service";
import { QuizService } from "src/quiz/quiz.service";
import { CategoryType } from "../enum/global-enum";
import {
  getArticleTypeList,
  getCategoryTypeList,
  getCouponTypeList,
  getDiscountTypeList,
  getFacialFeatureTypeList,
  getFaqList,
  getMediaTypeList,
  getNameTypeList,
  getQuestionTypeList,
  getRoleList,
  getShapeTypeList,
  getWeight,
} from "../utilties/get-flobal-list-from-enum.utils";

@Injectable()
export class ListService {
  constructor(
    private readonly categoryService: CategoryService,
    private readonly shapeService: ShapeCategoryService,
    private readonly quizService: QuizService,
    private readonly bookService: BookService,
  ) {}
  private lists = {
    roles: getRoleList(),
    faq: getFaqList(),
    weight: getWeight(),
    mediaType: getMediaTypeList(),
    articleType: getArticleTypeList(),
    categoryType: getCategoryTypeList(),
    couponType: getCouponTypeList(),
    discountType: getDiscountTypeList(),
    facialFeatureType: getFacialFeatureTypeList(),
    nameTypes: getNameTypeList(),
    shapeType: getShapeTypeList(),
    questionType: getQuestionTypeList(),
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
      case "coupon":
        return {
          couponType: this.lists.couponType,
          discountType: this.lists.discountType,
        };
      case "shapeCategoryType":
        return {
          shapeType: this.lists.shapeType,
          facialFeatureType: this.lists.facialFeatureType,
        };

      case "facialFeature":
        return {
          shapeType: this.lists.shapeType,
          facialFeatureType: this.lists.facialFeatureType,
          shapeCategoryType: await this.shapeService.getShapeCategoriesWithNameValue(),
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
          discountType: this.lists.discountType,
        };
      case "product-attributes":
        return {
          nameTypes: this.lists.nameTypes,
        };
      case "quiz":
        return {
          questionType: this.lists.questionType,
        };
      case "answer":
        return {
          quiez: await this.quizService.getQuestionsWithIdAndTitle(),
          books: await this.bookService.getBooksWithIdAndTitle(),
        };
      default:
        throw new Error(`Slug "${slug}" not supported`);
    }
  }
}
