import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { FilterDateModule } from "src/shared/filters/filter-date.module";
import { CouponController } from "./coupon.controller";
import { Coupon } from "./coupon.entity";
import { CouponsService } from "./coupon.service";

@Module({
  imports: [FilterDateModule, TypeOrmModule.forFeature([Coupon])],
  controllers: [CouponController],
  providers: [CouponsService],
  exports: [CouponsService],
})
export class CouponModule {}
