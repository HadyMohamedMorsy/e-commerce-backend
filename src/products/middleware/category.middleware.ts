import { Injectable, NestMiddleware } from "@nestjs/common";
import { NextFunction, Request, Response } from "express";
import { CategoryService } from "src/categories/category.service";

@Injectable()
export class CategoryMiddleware implements NestMiddleware {
  constructor(private readonly categoryService: CategoryService) {}

  async use(req: Request, res: Response, next: NextFunction) {
    if (req.body.categoryIds && Array.isArray(req.body.categoryIds)) {
      const categories = await this.categoryService.findByIds(req.body.categoryIds);

      if (categories.length !== req.body.categoryIds.length) {
        throw new Error("Some categories were not found");
      }

      req["categories"] = categories;
    }
    next();
  }
}
