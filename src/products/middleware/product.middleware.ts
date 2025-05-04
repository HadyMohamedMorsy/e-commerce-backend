import { Injectable, NestMiddleware } from "@nestjs/common";
import { NextFunction, Request, Response } from "express";
import { ProductService } from "../products.service";

@Injectable()
export class ProductMiddleware implements NestMiddleware {
  constructor(private readonly productService: ProductService) {}

  async use(req: Request, res: Response, next: NextFunction) {
    if (req.body.productId) {
      const product = await this.productService.findOne(req.body.productId);

      if (!product) {
        throw new Error("Product not found");
      }

      req["product"] = product;
    }
    next();
  }
}
