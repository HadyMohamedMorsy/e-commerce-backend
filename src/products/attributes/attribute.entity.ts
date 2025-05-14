import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Product } from "../products.entity";

@Entity()
export class Attribute {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  value: string;

  @Column({ default: null })
  image: string;

  @Column({ type: "json", default: null })
  images: string[];

  @Column({ default: 0, nullable: true })
  priceChange: number;

  @Column({ default: 0, nullable: true })
  quantity: number;

  @ManyToOne(() => Product, product => product.attributes)
  product: Product;
}
