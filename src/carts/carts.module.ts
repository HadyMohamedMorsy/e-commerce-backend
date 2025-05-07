import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ProductModule } from "src/products/products.module";
import { FilterDateModule } from "src/shared/filters/filter-date.module";
import { CartItem } from "./cart-item.entity";
import { Cart } from "./cart.entity";
import { CartController } from "./carts.controller";
import { CartService } from "./carts.service";

@Module({
  imports: [FilterDateModule, ProductModule, TypeOrmModule.forFeature([Cart, CartItem])],
  controllers: [CartController],
  providers: [CartService],
  exports: [CartService],
})
export class CartModule {}
