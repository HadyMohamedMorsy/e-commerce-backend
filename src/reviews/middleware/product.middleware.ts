import { Injectable, NestMiddleware, NotFoundException } from "@nestjs/common";
import { NextFunction, Request, Response } from "express";
import { ProductService } from "src/products/products.service";

@Injectable()
export class ProductMiddleware implements NestMiddleware {
  constructor(private readonly productService: ProductService) {}

  async use(req: Request, res: Response, next: NextFunction) {
    if (req.body.productId) {
      await this.validateAndSetProduct(req, "id", req.body.productId);
    } else if (req.body.slug) {
      await this.validateAndSetProduct(req, "slug", req.body.slug);
    }
    next();
  }

  private async validateAndSetProduct(req: Request, type: "id" | "slug", value: string | number) {
    try {
      const product =
        type === "id"
          ? await this.productService.findOne(value as number)
          : await this.productService.findProductBySlug(value as string);

      if (!product) {
        throw new NotFoundException(`Product with ${type} ${value} not found`);
      }

      req["product"] = product;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new Error(`Error validating product: ${error.message}`);
    }
  }
}
