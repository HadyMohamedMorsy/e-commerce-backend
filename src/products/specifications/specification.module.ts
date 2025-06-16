import { MiddlewareConsumer, Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ProductMiddleware } from "../middleware/product.middleware";
import { ProductModule } from "../products.module";
import { SpecificationController } from "./specification.controller";
import { Specification } from "./specification.entity";
import { SpecificationService } from "./specification.service";

@Module({
  imports: [TypeOrmModule.forFeature([Specification]), ProductModule],
  controllers: [SpecificationController],
  providers: [SpecificationService],
  exports: [SpecificationService],
})
export class SpecificationModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(ProductMiddleware).forRoutes("specification/store", "specification/update");
  }
}
