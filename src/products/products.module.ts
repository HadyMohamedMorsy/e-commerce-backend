import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { FilterDateModule } from "src/shared/filters/filter-date.module";
import { ProductAttribute } from "./product-attribute.entity";
import { ProductSku } from "./product-sku.entity";
import { ProductController } from "./products.controller";
import { Product } from "./products.entity";
import { ProductService } from "./products.service";

@Module({
  imports: [FilterDateModule, TypeOrmModule.forFeature([Product, ProductSku, ProductAttribute])],
  controllers: [ProductController],
  providers: [ProductService],
  exports: [ProductService],
})
export class ProductModule {}
