import { BaseMemberEntity } from "src/shared/entities/base.entity";
import { FacialFeatureType } from "src/shared/enum/global-enum";
import { User } from "src/users/user.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity("shapes")
export class Shape extends BaseMemberEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: "enum",
    enum: FacialFeatureType,
    default: FacialFeatureType.BEARD,
  })
  type: FacialFeatureType;

  @Column({ nullable: true })
  image: string;

  @ManyToOne(() => User, user => user.id, { onDelete: "SET NULL" })
  createdBy: User;
}
