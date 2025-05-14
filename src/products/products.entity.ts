// src/products/entities/product.entity.ts
import { Category } from "src/categories/category.entity";
import { BaseMemberEntity } from "src/shared/entities/base.entity";
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Attribute } from "./attributes/attribute.entity";
import { ProductSku } from "./skus/sku.entity";

@Entity("products")
export class Product extends BaseMemberEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column("varchar")
  name: string;

  @Column("varchar", { nullable: true })
  description: string;

  @Column("varchar", { nullable: true })
  metaTitle: string;

  @Column("varchar", { nullable: true })
  metaDescription: string;

  @Column("varchar", { nullable: true })
  summary: string;

  @Column("varchar", { nullable: true })
  cover: string;

  @ManyToMany(() => Category, category => category.products)
  @JoinTable({ name: "product_categories" })
  categories: Category[];

  @OneToOne(() => ProductSku, sku => sku.product)
  sku: ProductSku;

  @OneToMany(() => Attribute, attribute => attribute.product)
  attributes: Attribute[];
}
