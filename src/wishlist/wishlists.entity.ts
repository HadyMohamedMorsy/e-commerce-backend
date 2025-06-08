// src/wishlists/entities/wishlist.entity.ts
import { Product } from "src/products/products.entity";
import { BaseMemberEntity } from "src/shared/entities/base.entity";
import { User } from "src/users/user.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity("wishlists")
export class Wishlist extends BaseMemberEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Product)
  @JoinColumn({ name: "product_id" })
  product: Product;

  @ManyToOne(() => User)
  @JoinColumn({ name: "user_id" })
  user: User;

  @Column({ type: "boolean", default: true })
  isFav: boolean;

  @ManyToOne(() => User, user => user.id, { onDelete: "SET NULL" })
  createdBy: User;
}
