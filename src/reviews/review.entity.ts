import { Product } from "src/products/products.entity";
import { BaseMemberEntity } from "src/shared/entities/base.entity";
import { User } from "src/users/user.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity("reviews")
export class Review extends BaseMemberEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: "is_approved", type: "boolean", default: false })
  isApproved: boolean;

  @Column({ type: "text" })
  comment: string;

  @Column({ type: "decimal", precision: 3, scale: 1 })
  rate: number;

  @ManyToOne(() => Product, product => product.reviews, { onDelete: "CASCADE" })
  @JoinColumn()
  product: Product;

  @ManyToOne(() => User, user => user.id, { onDelete: "SET NULL" })
  createdBy: User;
}
