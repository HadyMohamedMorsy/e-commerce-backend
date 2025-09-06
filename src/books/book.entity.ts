import { Answer } from "src/answers/answer.entity";
import { BaseMemberEntity } from "src/shared/entities/base.entity";
import { User } from "src/users/user.entity";
import { Column, Entity, JoinColumn, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { OrderCustom } from "../order-custom/order-custom.entity";

@Entity("books")
export class Book extends BaseMemberEntity {
  @PrimaryGeneratedColumn()
  id?: number | null;

  @Column({ type: "varchar", length: 255, nullable: false })
  title: string;

  @Column({ type: "decimal", precision: 10, scale: 2, nullable: false })
  price: number;

  @Column({ type: "varchar", length: 255, nullable: false, enum: ["cover", "page"] })
  type: "cover" | "page";

  @Column({ type: "text", nullable: true })
  svg: string;

  @ManyToMany(() => Answer, answer => answer.books)
  answers: Answer[];

  @ManyToOne(() => OrderCustom, orderCustom => orderCustom.books)
  @JoinColumn({ name: "orderCustomId" })
  orderCustom: OrderCustom;

  @ManyToOne(() => User, { nullable: true, onDelete: "SET NULL" })
  createdBy: User;
}
