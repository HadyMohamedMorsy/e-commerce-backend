import { Product } from "src/products/products.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Order } from "./order.entity";

@Entity("order_item")
export class OrderItem {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Order, { onDelete: "CASCADE" })
  order: Order;

  @ManyToOne(() => Product, { onDelete: "CASCADE" })
  product: Product;

  @Column("integer")
  quantity: number;

  @Column("integer")
  price: number;
}
