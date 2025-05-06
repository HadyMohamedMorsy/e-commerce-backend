import { DiscountType } from "src/shared/enum/global-enum";
import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from "typeorm";
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

  @Column({ type: "decimal", precision: 5, scale: 2, nullable: true })
  discount: number | null;

  @Column({ type: "enum", enum: DiscountType, nullable: true })
  discountType: DiscountType | null;

  @OneToOne(() => Product, product => product.sku)
  product: Product;
}
