// src/categories/category.entity.ts
import { BaseMemberEntity } from "src/shared/entities/base.entity";
import { CategoryType } from "src/shared/enum/global-enum";
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
    type: "enum",
    enum: CategoryType,
    default: CategoryType.PRODUCT,
    name: "category_type",
  })
  categoryType: CategoryType;

  @Column({
    type: "text",
    nullable: true,
  })
  description: string;

  @ManyToOne(() => Category, category => category.subCategories)
  category: Category;

  @Column({ nullable: true })
  image?: string;
}
