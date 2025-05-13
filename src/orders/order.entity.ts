// src/orders/entities/order.entity.ts
import { Column, Entity, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";

import { BaseMemberEntity } from "src/shared/entities/base.entity";
import { OrderStatus, PaymentStatus } from "src/shared/enum/global-enum";
import { OrderItem } from "./order-item.entity";
import { PaymentDetail } from "./payment-detail.entity";

@Entity("order_details")
export class Order extends BaseMemberEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => PaymentDetail, payment => payment.order)
  payment: PaymentDetail;

  @Column("enum", {
    enum: PaymentStatus,
    default: PaymentStatus.PENDING,
  })
  paymentStatus: PaymentStatus;

  @OneToMany(() => OrderItem, orderItem => orderItem.order)
  orderItems: OrderItem[];

  @Column("enum", {
    enum: OrderStatus,
    default: OrderStatus.PENDING,
  })
  status: OrderStatus;

  @Column("integer")
  total: number;
}
