import { Injectable, NestMiddleware, NotFoundException } from "@nestjs/common";
import { NextFunction, Request, Response } from "express";
import { ProductService } from "../products.service";

@Injectable()
export class ProductMiddleware implements NestMiddleware {
  constructor(private readonly productService: ProductService) {}

  async use(req: Request, res: Response, next: NextFunction) {
    if (req.body.productId) {
      const product = await this.productService.findOne(req.body.productId);

      if (!product) {
        throw new NotFoundException(`Product with ID ${req.body.productId} not found`);
      }

      req["product"] = product;
    }
    next();
  }
}
