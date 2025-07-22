import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Category } from "src/categories/category.entity";
import { CategoryModule } from "src/categories/category.module";
import { SubCategory } from "src/categories/sub-categories/sub-category.entity";
import { SubCategoryModule } from "src/categories/sub-categories/sub-category.module";
import { FilterDateModule } from "src/shared/filters/filter-date.module";
import { CategoryMiddleware } from "./middleware/category.middleware";
import { ProductController } from "./products.controller";
import { Product } from "./products.entity";
import { ProductService } from "./products.service";

@Module({
  imports: [
    CategoryModule,
    SubCategoryModule,
    FilterDateModule,
    TypeOrmModule.forFeature([Product, Category, SubCategory]),
  ],
  controllers: [ProductController],
  providers: [ProductService],
  exports: [ProductService],
})
export class ProductModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(CategoryMiddleware).forRoutes("product/store", "product/update");
  }
}
