import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AddressModule } from "src/address/address.module";
import { CouponModule } from "src/coupons/coupon.module";
import { PaymentMethodModule } from "src/payment-methods/payment-method.module";
import { ProductModule } from "src/products/products.module";
import { FilterDateModule } from "src/shared/filters/filter-date.module";
import { OrderItem } from "./order-item.entity";
import { OrderController } from "./order.controller";
import { Order } from "./order.entity";
import { OrderService } from "./order.service";
@Module({
  imports: [
    FilterDateModule,
    ProductModule,
    AddressModule,
    CouponModule,
    PaymentMethodModule,
    TypeOrmModule.forFeature([Order, OrderItem]),
  ],
  controllers: [OrderController],
  providers: [OrderService],
  exports: [OrderService],
})
export class OrderModule {}
