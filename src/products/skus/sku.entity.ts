import { DiscountType } from "src/shared/enum/global-enum";
import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Product } from "../products.entity";

@Entity()
export class ProductSku {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  sku: string;

  @Column()
  price: number;

  @Column()
  quantity: number;

  @Column({ type: "decimal", precision: 5, scale: 2, nullable: true })
  discount: number | null;

  @Column({ type: "enum", enum: DiscountType, nullable: true })
  discountType: DiscountType;

  @OneToOne(() => Product, product => product.sku)
  @JoinColumn()
  product: Product;
}
