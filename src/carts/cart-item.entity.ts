// src/carts/entities/cart-item.entity.ts
import { Product } from "src/products/products.entity";
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { Cart } from "./cart.entity";

@Entity("cart_items")
export class CartItem {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Cart, { onDelete: "CASCADE" })
  cart: Cart;

  @ManyToOne(() => Product, { onDelete: "CASCADE" })
  product: Product;

  @Column("integer")
  quantity: number;

  @CreateDateColumn({ name: "created_at" })
  createdAt: Date;

  @UpdateDateColumn({ name: "updated_at" })
  updatedAt: Date;
}
