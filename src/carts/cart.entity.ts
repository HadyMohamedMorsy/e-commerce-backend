// src/carts/entities/cart.entity.ts
import { BaseMemberEntity } from "src/shared/entities/base.entity";
import { User } from "src/users/user.entity";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { CartItem } from "./cart-item.entity";

@Entity("carts")
export class Cart extends BaseMemberEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, { onDelete: "SET NULL" })
  user: User;

  @Column({ type: "decimal", precision: 10, scale: 2, default: 0 })
  total: number;

  @OneToMany(() => CartItem, cartItem => cartItem.cart)
  cartItems: CartItem[];
}
