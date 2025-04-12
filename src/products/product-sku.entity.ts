// src/products/entities/product-sku.entity.ts
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { ProductAttribute } from "./product-attribute.entity";
import { Product } from "./products.entity";

@Entity("products_skus")
export class ProductSku {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Product)
  product: Product;

  @Column("varchar")
  sku: string;

  @Column("decimal", { precision: 10, scale: 2 })
  price: number;

  @Column("integer")
  quantity: number;

  @ManyToMany(() => ProductAttribute)
  @JoinTable()
  attributes: ProductAttribute[];

  @CreateDateColumn({ name: "created_at" })
  createdAt: Date;

  @DeleteDateColumn({ name: "deleted_at", nullable: true })
  deletedAt: Date;
}
