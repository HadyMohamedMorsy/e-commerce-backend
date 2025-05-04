import { MiddlewareConsumer, Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ProductMiddleware } from "../middleware/product.middleware";
import { ProductModule } from "../products.module";
import { AttributeController } from "./attribute.controller";
import { Attribute } from "./attribute.entity";
import { AttributeService } from "./attribute.service";

@Module({
  imports: [ProductModule, TypeOrmModule.forFeature([Attribute])],
  controllers: [AttributeController],
  providers: [AttributeService],
  exports: [AttributeService],
})
export class AttributeModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(ProductMiddleware).forRoutes("attribute/store", "attribute/update");
  }
}
