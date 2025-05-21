import { DiscountType } from "src/shared/enum/global-enum";
import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Product } from "../products.entity";

@Entity()
export class ProductSku {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  sku: string;

  @Column({ default: 0 })
  price: number;

  @Column({ default: 0 })
  quantity: number;

  @Column("boolean", { default: false })
  isOutOfStock: boolean;

  @Column("boolean", { default: false })
  isFeatured: boolean;

  @Column("boolean", { default: false })
  isOffered: boolean;

  @Column("boolean", { default: false })
  isNew: boolean;

  @Column("boolean", { default: false })
  isBestSeller: boolean;

  @Column({ type: "decimal", precision: 5, scale: 2, nullable: true })
  discount: number | null;

  @Column({ type: "enum", enum: DiscountType, nullable: true })
  discountType: DiscountType;

  @OneToOne(() => Product, product => product.sku)
  @JoinColumn()
  product: Product;
}
