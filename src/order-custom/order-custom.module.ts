import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { FilterDateModule } from "src/shared/filters/filter-date.module";
import { BookModule } from "../books/book.module";
import { CouponModule } from "../coupons/coupon.module";
import { PaperTypeModule } from "../paper-type/paper-type.module";
import { PaymentMethodModule } from "../payment-methods/payment-method.module";
import { OrderCustomController } from "./order-custom.controller";
import { OrderCustom } from "./order-custom.entity";
import { OrderCustomService } from "./order-custom.service";

@Module({
  imports: [
    FilterDateModule,
    TypeOrmModule.forFeature([OrderCustom]),
    BookModule,
    CouponModule,
    PaperTypeModule,
    PaymentMethodModule,
  ],
  controllers: [OrderCustomController],
  providers: [OrderCustomService],
  exports: [OrderCustomService],
})
export class OrderCustomModule {}
