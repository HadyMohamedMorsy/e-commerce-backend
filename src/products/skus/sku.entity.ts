import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Product } from "../products.entity";

@Entity()
export class Sku {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  sku: string;

  @Column()
  price: number;

  @Column()
  quantity: number;

  @ManyToOne(() => Product, product => product.skus)
  product: Product;
}
