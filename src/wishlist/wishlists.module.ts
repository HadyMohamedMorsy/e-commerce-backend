import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { FilterDateModule } from "src/shared/filters/filter-date.module";
import { WishlistsService } from "./wishlist.service";
import { WishlistsController } from "./wishlists.controller";
import { Wishlist } from "./wishlists.entity";

@Module({
  imports: [FilterDateModule, TypeOrmModule.forFeature([Wishlist])],
  controllers: [WishlistsController],
  providers: [WishlistsService],
  exports: [WishlistsService],
})
export class WishlistsModule {}
