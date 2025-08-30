import { ShapeCategory } from "src/shape-categories/shape-categories.entity";
import { BaseMemberEntity } from "src/shared/entities/base.entity";
import { User } from "src/users/user.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity("shapes")
export class Shape extends BaseMemberEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  image: string;

  @ManyToOne(() => ShapeCategory, shapeCategory => shapeCategory.shapes)
  @JoinColumn({ name: "shapeCategoryId" })
  shapeCategory: ShapeCategory;

  @ManyToOne(() => User, user => user.id, { onDelete: "SET NULL" })
  createdBy: User;
}
