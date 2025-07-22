import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { OrderItem } from "../orders/order-item.entity";
import { Order } from "../orders/order.entity";
import { Product } from "../products/products.entity";
import { Review } from "../reviews/review.entity";
import { User } from "../users/user.entity";
import { DashboardController } from "./dashboard.controller";
import { DashboardService } from "./dashboard.service";

@Module({
  imports: [TypeOrmModule.forFeature([Order, OrderItem, Product, User, Review])],
  controllers: [DashboardController],
  providers: [DashboardService],
  exports: [DashboardService],
})
export class DashboardModule {}
