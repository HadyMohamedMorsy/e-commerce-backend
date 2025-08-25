// src/products/entities/product.entity.ts
import { Category } from "src/categories/category.entity";
import { Faq } from "src/faq/faq.entity";
import { Review } from "src/reviews/review.entity";
import { BaseMemberEntity } from "src/shared/entities/base.entity";
import { User } from "src/users/user.entity";
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Attribute } from "./attributes/attribute.entity";
import { ProductSku } from "./skus/sku.entity";
import { Specification } from "./specifications/specification.entity";

@Entity("products")
export class Product extends BaseMemberEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column("varchar")
  name: string;

  @Column("varchar", { unique: true, nullable: true })
  slug: string;

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

  @Column({ type: "json", default: null })
  images: string[];

  @OneToMany(() => Specification, specification => specification.product)
  specifications: Specification[];

  @Column({ type: "decimal", precision: 5, scale: 2, nullable: true })
  rating: number;

  @ManyToMany(() => Category, category => category.products, { onDelete: "CASCADE" })
  @JoinTable({ name: "product_categories" })
  categories: Category[];

  @OneToOne(() => ProductSku, sku => sku.product)
  sku: ProductSku;

  @OneToMany(() => Faq, faq => faq.products)
  faq: Faq[];

  @OneToMany(() => Review, review => review.product)
  reviews: Review[];

  @OneToMany(() => Attribute, attribute => attribute.product)
  attributes: Attribute[];

  @ManyToOne(() => User, user => user.id, { onDelete: "SET NULL" })
  createdBy: User;
}
