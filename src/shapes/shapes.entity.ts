import { BaseMemberEntity } from "src/shared/entities/base.entity";
import { FacialFeatureType } from "src/shared/enum/global-enum";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

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
}
