import { MiddlewareConsumer, Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ProductMiddleware } from "../middleware/product.middleware";
import { ProductModule } from "../products.module";
import { SkuController } from "./sku.controller";
import { ProductSku } from "./sku.entity";
import { SkuService } from "./sku.service";

@Module({
  imports: [ProductModule, TypeOrmModule.forFeature([ProductSku])],
  controllers: [SkuController],
  providers: [SkuService],
  exports: [SkuService],
})
export class SkuModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(ProductMiddleware).forRoutes("product-sku/store", "product-sku/update");
  }
}
