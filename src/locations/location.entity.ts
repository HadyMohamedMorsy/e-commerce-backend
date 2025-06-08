import { BaseMemberEntity } from "src/shared/entities/base.entity";
import { Shipment } from "src/shipments/shipment.entity";
import { User } from "src/users/user.entity";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Location extends BaseMemberEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "varchar", length: 255, nullable: true })
  name: string | null;

  @ManyToOne(() => Location, location => location.children)
  parent: Location;

  @OneToMany(() => Location, location => location.parent)
  children: Location[];

  @OneToMany(() => Shipment, shipment => shipment.location)
  shipments: Shipment[];

  @ManyToOne(() => User, user => user.id, { onDelete: "SET NULL" })
  createdBy: User;
}
