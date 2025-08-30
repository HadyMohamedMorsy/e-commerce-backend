import { BaseMemberEntity } from "src/shared/entities/base.entity";
import { FacialFeatureType, ShapeType } from "src/shared/enum/global-enum";
import { User } from "src/users/user.entity";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Shape } from "../shapes/shapes.entity";

@Entity("shape_categories")
export class ShapeCategory extends BaseMemberEntity {
  @PrimaryGeneratedColumn()
  id?: number | null;

  @Column({ type: "varchar", length: 100, nullable: false })
  type: FacialFeatureType;

  @Column({ type: "varchar", length: 100, nullable: false })
  shapeType: ShapeType;

  @Column({ type: "varchar", length: 255, nullable: false, unique: true })
  name: string;

  @OneToMany(() => Shape, shape => shape.shapeCategory)
  shapes: Shape[];

  @ManyToOne(() => User, { nullable: true, onDelete: "SET NULL" })
  createdBy: User;
}
