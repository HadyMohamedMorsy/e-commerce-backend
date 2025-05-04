// src/orders/entities/order.entity.ts
import { Column, Entity, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";

import { BaseMemberEntity } from "src/shared/entities/base.entity";
import { OrderItem } from "./order-item.entity";
import { PaymentDetail } from "./payment-detail.entity";

@Entity("order_details")
export class Order extends BaseMemberEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => PaymentDetail, payment => payment.order)
  payment: PaymentDetail;

  @OneToMany(() => OrderItem, orderItem => orderItem.order)
  orderItems: OrderItem[];

  @Column("integer")
  total: number;
}
