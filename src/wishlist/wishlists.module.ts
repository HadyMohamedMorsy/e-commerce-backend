import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ProductModule } from "src/products/products.module";
import { FilterDateModule } from "src/shared/filters/filter-date.module";
import { ProductMiddleware } from "./middleware/product.middleware";
import { WishlistsService } from "./wishlist.service";
import { WishlistsController } from "./wishlists.controller";
import { Wishlist } from "./wishlists.entity";

@Module({
  imports: [FilterDateModule, ProductModule, TypeOrmModule.forFeature([Wishlist])],
  controllers: [WishlistsController],
  providers: [WishlistsService],
  exports: [WishlistsService],
})
export class WishlistsModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(ProductMiddleware).forRoutes("wishlists/store", "wishlists/update");
  }
}
