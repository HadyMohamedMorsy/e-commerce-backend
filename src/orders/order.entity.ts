// src/orders/entities/order.entity.ts
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

import { Address } from "src/address/address.entity";
import { Coupon } from "src/coupons/coupon.entity";
import { PaymentMethod } from "src/payment-methods/payment-method.entity";
import { BaseMemberEntity } from "src/shared/entities/base.entity";
import { OrderStatus, PaymentStatus } from "src/shared/enum/global-enum";
import { User } from "src/users/user.entity";
import { OrderItem } from "./order-item.entity";

@Entity("order_details")
export class Order extends BaseMemberEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column("enum", {
    enum: PaymentStatus,
    default: PaymentStatus.PENDING,
  })
  paymentStatus: PaymentStatus;

  @OneToMany(() => OrderItem, orderItem => orderItem.order, { cascade: true, onDelete: "CASCADE" })
  orderItems: OrderItem[];

  @Column("enum", {
    enum: OrderStatus,
    default: OrderStatus.PENDING,
  })
  status: OrderStatus;

  @Column("integer")
  total: number;

  @ManyToOne(() => PaymentMethod, { nullable: true })
  payment: PaymentMethod;

  @ManyToOne(() => Coupon, { nullable: true })
  coupon: Coupon;

  @ManyToOne(() => Address, { nullable: true })
  address: Address;

  @ManyToOne(() => User, user => user.id, { onDelete: "SET NULL" })
  createdBy: User;
}
