import { Injectable, NestMiddleware, NotFoundException } from "@nestjs/common";
import { NextFunction, Request, Response } from "express";
import { ProductService } from "src/products/products.service";

@Injectable()
export class ProductMiddleware implements NestMiddleware {
  constructor(private readonly productService: ProductService) {}

  async use(req: Request, res: Response, next: NextFunction) {
    if (req.body.productId) {
      try {
        const product = await this.productService.findOne(req.body.productId);

        if (!product) {
          throw new NotFoundException(`Product with ID ${req.body.productId} not found`);
        }

        req["product"] = product;
      } catch (error) {
        if (error instanceof NotFoundException) {
          throw error;
        }
        throw new Error(`Error validating product: ${error.message}`);
      }
    }
    next();
  }
}
