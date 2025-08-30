import { BaseMemberEntity } from "src/shared/entities/base.entity";
import { User } from "src/users/user.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Book } from "../books/book.entity";
import { PaymentMethod } from "../payment-methods/payment-method.entity";

@Entity("order_customs")
export class OrderCustom extends BaseMemberEntity {
  @PrimaryGeneratedColumn()
  id?: number | null;

  @Column({ type: "decimal", precision: 10, scale: 2, nullable: false, default: 0 })
  totalPrice: number;

  @ManyToOne(() => PaymentMethod)
  @JoinColumn({ name: "paymentMethodId" })
  paymentMethod: PaymentMethod;

  @Column({ type: "varchar", length: 50, nullable: false, default: "pending" })
  status: string; // pending, processing, completed, cancelled

  @OneToMany(() => Book, book => book.orderCustom)
  books: Book[];

  @ManyToOne(() => User, { nullable: true, onDelete: "SET NULL" })
  createdBy: User;
}
