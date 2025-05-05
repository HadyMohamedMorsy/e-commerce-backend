import { Injectable, NestMiddleware } from "@nestjs/common";
import { NextFunction, Request, Response } from "express";
import { CategoryService } from "src/categories/category.service";

@Injectable()
export class BlogCategoryMiddleware implements NestMiddleware {
  constructor(private readonly categoryService: CategoryService) {}
  async use(req: Request, res: Response, next: NextFunction) {
    const { categoryIds } = req.body;

    if (categoryIds && Array.isArray(categoryIds)) {
      try {
        const categories = await this.categoryService.findByIds(categoryIds);
        req["categories"] = categories;
      } catch (error) {
        console.error("Error fetching categories:", error);
        req["categories"] = [];
      }
    }

    next();
  }
}
