import { Product } from "src/products/products.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Order } from "./order.entity";

@Entity("order_item")
export class OrderItem {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Order)
  @JoinColumn({ name: "order_id" })
  order: Order;

  @ManyToOne(() => Product)
  @JoinColumn({ name: "product_id" })
  product: Product;

  @Column("integer")
  quantity: number;

  @Column("integer")
  price: number;
}
