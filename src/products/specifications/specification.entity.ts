import { BaseMemberEntity } from "src/shared/entities/base.entity";
import { User } from "src/users/user.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Product } from "../products.entity";

@Entity("specifications")
export class Specification extends BaseMemberEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column("jsonb")
  attributes: Array<{
    name: string;
    value: string;
  }>;

  @ManyToOne(() => Product, product => product.specifications)
  product: Product;

  @ManyToOne(() => User, user => user.id, { onDelete: "SET NULL" })
  createdBy: User;
}
