import { Column, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity("coupons")
export class Coupon {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  code: string;

  @Column({ name: "coupon_type" })
  couponType: string;

  @Column({ type: "decimal", precision: 10, scale: 2 })
  discount: number;

  @Column({ name: "discount_type" })
  discountType: string;

  @Column({ name: "expiry_date", type: "timestamp" })
  expiryDate: string;

  @Column({
    name: "min_order_total_price",
    type: "decimal",
    precision: 10,
    scale: 2,
    default: 0,
  })
  minOrderTotalPrice: number;

  @Column({
    name: "min_order_item_count",
    default: 0,
  })
  minOrderItemCount: number;

  @Column({
    name: "created_at",
    type: "timestamp",
    default: () => "CURRENT_TIMESTAMP",
  })
  createdAt: string;

  @UpdateDateColumn({
    type: "timestamp",
    default: () => "CURRENT_TIMESTAMP",
    onUpdate: "CURRENT_TIMESTAMP",
  })
  updated_at: Date;
}
