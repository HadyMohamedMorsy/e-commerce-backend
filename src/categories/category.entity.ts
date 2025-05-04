// src/categories/category.entity.ts
import { Product } from "src/products/products.entity";
import { BaseMemberEntity } from "src/shared/entities/base.entity";
import { Column, Entity, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { SubCategory } from "./sub-categories/sub-category.entity";

@Entity("categories")
export class Category extends BaseMemberEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column("varchar")
  name: string;

  @Column("varchar", { nullable: true })
  description: string;

  @ManyToMany(() => Product, product => product.categories)
  @JoinTable({
    name: "product_categories",
    joinColumn: { name: "category_id", referencedColumnName: "id" },
    inverseJoinColumn: { name: "product_id", referencedColumnName: "id" },
  })
  products: Product[];

  @Column({ nullable: true })
  image?: string;

  @OneToMany(() => SubCategory, subCategory => subCategory.category)
  subCategories: SubCategory[];
}
