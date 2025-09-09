import { BaseMemberEntity } from "src/shared/entities/base.entity";
import { Weight } from "src/shared/enum/global-enum";
import { User } from "src/users/user.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Location } from "../locations/location.entity";

@Entity("shipments")
export class Shipment extends BaseMemberEntity {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column({
    type: "enum",
    enum: Weight,
    default: "item",
  })
  type: Weight;

  @Column({ name: "shipment_price", type: "decimal", precision: 10, scale: 2 })
  shipmentPrice: number;

  @ManyToOne(() => Location, location => location.shipments, { onDelete: "CASCADE" })
  location: Location;

  @ManyToOne(() => User, user => user.id, { onDelete: "SET NULL" })
  createdBy: User;
}
