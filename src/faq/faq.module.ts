import { MiddlewareConsumer, Module, NestModule, RequestMethod } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ProductModule } from "src/products/products.module";
import { FilterDateModule } from "src/shared/filters/filter-date.module";
import { FaqController } from "./faq.controller";
import { Faq } from "./faq.entity";
import { FaqsService } from "./faq.service";
import { FaqProductMiddleware } from "./middleware/faq-product.middleware";

@Module({
  imports: [FilterDateModule, ProductModule, TypeOrmModule.forFeature([Faq])],
  controllers: [FaqController],
  providers: [FaqsService],
  exports: [FaqsService],
})
export class FaqModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(FaqProductMiddleware)
      .forRoutes({ path: "faq/index", method: RequestMethod.POST });
  }
}
