import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ProductModule } from "src/products/products.module";
import { FilterDateModule } from "src/shared/filters/filter-date.module";
import { ProductMiddleware } from "./middleware/product.middleware";
import { ReviewController } from "./review.controller";
import { Review } from "./review.entity";
import { ReviewService } from "./review.service";

@Module({
  imports: [ProductModule, FilterDateModule, TypeOrmModule.forFeature([Review])],
  controllers: [ReviewController],
  providers: [ReviewService],
  exports: [ReviewService],
})
export class ReviewModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(ProductMiddleware).forRoutes("review/store", "review/update");
  }
}
