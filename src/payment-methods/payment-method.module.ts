import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { FilterDateModule } from "src/shared/filters/filter-date.module";
import { PaymentMethodController } from "./payment-method.controller";
import { PaymentMethod } from "./payment-method.entity";
import { PaymentMethodService } from "./payment-method.service";

@Module({
  imports: [FilterDateModule, TypeOrmModule.forFeature([PaymentMethod])],
  controllers: [PaymentMethodController],
  providers: [PaymentMethodService],
  exports: [PaymentMethodService],
})
export class PaymentMethodModule {}
