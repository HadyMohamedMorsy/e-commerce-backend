import { BaseMemberEntity } from "src/shared/entities/base.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Location } from "../locations/location.entity";

@Entity("tax")
export class Tax extends BaseMemberEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ type: "decimal", precision: 10, scale: 2 })
  rate: number;

  @ManyToOne(() => Location)
  @JoinColumn({ name: "locationId" })
  country: Location;

  @Column({ default: true })
  isActive: boolean;
}
