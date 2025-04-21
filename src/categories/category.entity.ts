// src/categories/category.entity.ts
import { User } from "src/users/user.entity";
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { SubCategory } from "./sub-categories/sub-category.entity";

@Entity()
export class Category {
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

  @ManyToOne(() => User)
  createdBy: User;

  @CreateDateColumn({
    name: "created_at",
    type: "timestamp",
    default: () => "CURRENT_TIMESTAMP",
  })
  createdAt: Date;

  @UpdateDateColumn({
    name: "updated_at",
    type: "timestamp",
    default: () => "CURRENT_TIMESTAMP",
    onUpdate: "CURRENT_TIMESTAMP",
  })
  updatedAt: Date;

  @DeleteDateColumn({
    name: "deleted_at",
    type: "timestamp",
    nullable: true,
  })
  deletedAt?: Date;
}
