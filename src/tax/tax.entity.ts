import { BaseMemberEntity } from "src/shared/entities/base.entity";
import { User } from "src/users/user.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Location } from "../locations/location.entity";

@Entity()
export class Taxes extends BaseMemberEntity {
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

  @ManyToOne(() => User, user => user.id, { onDelete: "SET NULL" })
  createdBy: User;
}
