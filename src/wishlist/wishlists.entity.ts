// src/wishlists/entities/wishlist.entity.ts
import { Product } from "src/products/products.entity";
import { BaseMemberEntity } from "src/shared/entities/base.entity";
import { User } from "src/users/user.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity("wishlists")
export class Wishlist extends BaseMemberEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Product, { onDelete: "CASCADE" })
  product: Product;

  @ManyToOne(() => User, { onDelete: "CASCADE" })
  user: User;

  @Column({ type: "boolean", default: true })
  isFav: boolean;

  @ManyToOne(() => User, user => user.id, { onDelete: "SET NULL" })
  createdBy: User;
}
