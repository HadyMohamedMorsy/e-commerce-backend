// src/categories/category.entity.ts
import { BaseMemberEntity } from "src/shared/entities/base.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { SubCategory } from "./sub-categories/sub-category.entity";

@Entity()
export class Category extends BaseMemberEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: "varchar",
    length: 255,
  })
  name: string;

  @Column({
    type: "text",
    nullable: true,
  })
  description: string;

  @OneToMany(() => SubCategory, subCategory => subCategory.category)
  subCategories: SubCategory[];
}
