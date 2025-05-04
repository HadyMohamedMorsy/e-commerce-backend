// src/products/entities/product.entity.ts
import { Category } from "src/categories/category.entity";
import { BaseMemberEntity } from "src/shared/entities/base.entity";
import { Column, Entity, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Attribute } from "./attributes/attribute.entity";
import { Sku } from "./skus/sku.entity";

@Entity("products")
export class Product extends BaseMemberEntity {
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

  @ManyToMany(() => Category, category => category.products)
  @JoinTable({
    name: "product_categories",
    joinColumn: { name: "product_id", referencedColumnName: "id" },
    inverseJoinColumn: { name: "category_id", referencedColumnName: "id" },
  })
  categories: Category[];

  @OneToMany(() => Sku, sku => sku.product)
  skus: Sku[];

  @OneToMany(() => Attribute, attribute => attribute.product)
  attributes: Attribute[];
}
