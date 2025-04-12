// src/products/entities/product.entity.ts
import { Category } from "src/categories/category.entity";
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { ProductAttribute } from "./product-attribute.entity";
import { ProductSku } from "./product-sku.entity";

@Entity("products")
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column("varchar")
  name: string;

  @Column("varchar", { nullable: true })
  description: string;

  @Column("varchar", { nullable: true })
  summary: string;

  @Column("varchar", { nullable: true })
  cover: string;

  @ManyToOne(() => Category)
  @Column({ name: "category_id" })
  categoryId: string;

  @CreateDateColumn({ name: "created_at" })
  createdAt: Date;

  @DeleteDateColumn({ name: "deleted_at", nullable: true })
  deletedAt: Date;

  @OneToMany(() => ProductSku, sku => sku.product)
  skus: ProductSku[];

  @OneToMany(() => ProductAttribute, attribute => attribute.product)
  attributes: ProductAttribute[];
}
