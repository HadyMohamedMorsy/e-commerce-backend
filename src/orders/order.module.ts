import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { FilterDateModule } from "src/shared/filters/filter-date.module";
import { OrderItem } from "./order-item.entity";
import { OrderController } from "./order.controller";
import { Order } from "./order.entity";
import { OrderService } from "./order.service";
import { PaymentDetail } from "./payment-detail.entity";
@Module({
  imports: [FilterDateModule, TypeOrmModule.forFeature([Order, OrderItem, PaymentDetail])],
  controllers: [OrderController],
  providers: [OrderService],
  exports: [OrderService],
})
export class OrderModule {}
