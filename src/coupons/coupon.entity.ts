import { BaseMemberEntity } from "src/shared/entities/base.entity";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("coupons")
export class Coupon extends BaseMemberEntity {
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

  @Column({ name: "is_active" })
  isActive: boolean;
}
