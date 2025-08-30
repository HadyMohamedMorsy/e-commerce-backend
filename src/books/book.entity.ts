import { BaseMemberEntity } from "src/shared/entities/base.entity";
import { User } from "src/users/user.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { OrderCustom } from "../order-custom/order-custom.entity";

@Entity("books")
export class Book extends BaseMemberEntity {
  @PrimaryGeneratedColumn()
  id?: number | null;

  @Column({ type: "varchar", length: 255, nullable: false })
  title: string;

  @Column({ type: "text", nullable: true })
  description: string;

  @Column({ type: "decimal", precision: 10, scale: 2, nullable: false })
  price: number;

  @Column({ type: "varchar", length: 500, nullable: true })
  svg: string;

  @ManyToOne(() => OrderCustom, orderCustom => orderCustom.books)
  @JoinColumn({ name: "orderCustomId" })
  orderCustom: OrderCustom;

  @ManyToOne(() => User, { nullable: true, onDelete: "SET NULL" })
  createdBy: User;
}
