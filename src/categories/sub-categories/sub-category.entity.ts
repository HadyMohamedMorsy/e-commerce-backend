// src/categories/category.entity.ts
import { BaseMemberEntity } from "src/shared/entities/base.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Category } from "../category.entity";

@Entity()
export class SubCategory extends BaseMemberEntity {
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

  @ManyToOne(() => Category, category => category.subCategories)
  category: Category;
}
