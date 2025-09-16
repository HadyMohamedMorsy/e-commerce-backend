import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AddressModule } from "src/address/address.module";
import { CouponModule } from "src/coupons/coupon.module";
import { PaymentMethodModule } from "src/payment-methods/payment-method.module";
import { ProductModule } from "src/products/products.module";
import { SkuModule } from "src/products/skus/sku.module";
import { FilterDateModule } from "src/shared/filters/filter-date.module";
import { EmailModule } from "src/shared/services/email.module";
import { OrderItem } from "./order-item.entity";
import { OrderController } from "./order.controller";
import { Order } from "./order.entity";
import { OrderService } from "./order.service";
@Module({
  imports: [
    FilterDateModule,
    ProductModule,
    SkuModule,
    AddressModule,
    CouponModule,
    PaymentMethodModule,
    EmailModule,
    TypeOrmModule.forFeature([Order, OrderItem]),
  ],
  controllers: [OrderController],
  providers: [OrderService],
  exports: [OrderService],
})
export class OrderModule {}
