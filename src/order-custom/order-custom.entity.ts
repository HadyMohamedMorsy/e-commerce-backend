import { BaseMemberEntity } from "src/shared/entities/base.entity";
import { User } from "src/users/user.entity";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Book } from "../books/book.entity";
import { PaperType } from "../paper-type/paper-type.entity";
import { PaymentMethod } from "../payment-methods/payment-method.entity";

@Entity("order_customs")
export class OrderCustom extends BaseMemberEntity {
  @PrimaryGeneratedColumn()
  id?: number | null;

  @Column({ type: "decimal", precision: 10, scale: 2, nullable: false, default: 0 })
  totalPrice: number;

  @ManyToOne(() => PaymentMethod, { onDelete: "CASCADE" })
  paymentMethod: PaymentMethod;

  @Column({ type: "varchar", length: 50, nullable: false, default: "pending" })
  status: string;

  @OneToMany(() => Book, book => book.orderCustom)
  books: Book[];

  @ManyToOne(() => PaperType, { nullable: true, onDelete: "SET NULL" })
  paperType: PaperType;

  @ManyToOne(() => User, { nullable: true, onDelete: "SET NULL" })
  createdBy: User;
}
