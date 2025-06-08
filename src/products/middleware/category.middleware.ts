import { Injectable, NestMiddleware, NotFoundException } from "@nestjs/common";
import { NextFunction, Request, Response } from "express";
import { CategoryService } from "src/categories/category.service";
import { ProductService } from "../products.service";

@Injectable()
export class CategoryMiddleware implements NestMiddleware {
  constructor(
    private readonly categoryService: CategoryService,
    private readonly productService: ProductService,
  ) {}

  async use(req: Request, res: Response, next: NextFunction) {
    if (req.body.categoryIds && Array.isArray(req.body.categoryIds)) {
      const categories = await this.categoryService.findByIds(req.body.categoryIds);
      if (categories.length !== req.body.categoryIds.length) {
        throw new Error("Some categories were not found");
      }
      req["categories"] = categories;
    }

    if (req.method === "PUT") {
      const product = await this.productService.findOne(req.body.id);
      if (!product) {
        throw new NotFoundException(`Product with id ${req.body.id} not found`);
      }
      req["product"] = product;
    }

    next();
  }
}
