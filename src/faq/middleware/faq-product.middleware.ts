import { Injectable, NestMiddleware } from "@nestjs/common";
import { NextFunction, Request, Response } from "express";
import { ProductService } from "src/products/products.service";
import { FaqList } from "src/shared/enum/global-enum";

@Injectable()
export class FaqProductMiddleware implements NestMiddleware {
  constructor(private readonly productService: ProductService) {}

  async use(req: Request, res: Response, next: NextFunction) {
    const body = req.body;

    if (body.selectQuestionableType === FaqList.Product && body.productId) {
      const product = await this.productService.findOne(body.productId);
      req["product"] = product;
    }

    next();
  }
}
