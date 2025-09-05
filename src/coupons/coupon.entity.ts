import { BaseMemberEntity } from "src/shared/entities/base.entity";
import { CouponType } from "src/shared/enum/global-enum";
import { User } from "src/users/user.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity("coupons")
export class Coupon extends BaseMemberEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  code: string;

  @Column({ type: "enum", enum: CouponType, name: "coupon_type" })
  couponType: CouponType;

  @Column({ type: "decimal", precision: 10, scale: 2 })
  discount: number;

  @Column({ name: "discount_type" })
  discountType: string;

  @Column({ name: "used_count", default: 0 })
  usedCount: number;

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

  @Column({ name: "number_of_users", default: 0 })
  numberOfUsers: number;

  @Column({ name: "is_active", default: true })
  isActive: boolean;

  @ManyToOne(() => User, user => user.id, { onDelete: "SET NULL" })
  createdBy: User;
}
