import { BaseMemberEntity } from "src/shared/entities/base.entity";
import { FacialFeatureType, ShapePartType, ShapeType } from "src/shared/enum/global-enum";
import { User } from "src/users/user.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity("shape_categories")
export class ShapeCategory extends BaseMemberEntity {
  @PrimaryGeneratedColumn()
  id?: number | null;

  @Column({ type: "varchar", length: 100, nullable: false })
  type: FacialFeatureType;

  @Column({ type: "varchar", length: 100, nullable: false })
  shapeType: ShapeType;

  @Column({ type: "varchar", length: 100, nullable: true })
  part: ShapePartType;

  @Column({ type: "varchar", length: 255, nullable: false, unique: true })
  name: string;

  @ManyToOne(() => User, { nullable: true, onDelete: "SET NULL" })
  createdBy: User;
}
