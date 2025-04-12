import { PaymentStatus } from "src/shared/enum/global-enum";
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { Order } from "./order.entity";

@Entity("payment_details")
export class PaymentDetail {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => Order, order => order.payment)
  @JoinColumn({ name: "order_id" })
  order: Order;

  @Column("integer")
  amount: number;

  @Column("varchar")
  provider: string;

  @Column({
    type: "enum",
    enum: PaymentStatus,
    default: PaymentStatus.PENDING,
  })
  status: PaymentStatus;

  @CreateDateColumn({ name: "created_at" })
  createdAt: Date;

  @UpdateDateColumn({ name: "updated_at" })
  updatedAt: Date;
}
