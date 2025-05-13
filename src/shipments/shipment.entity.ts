import { BaseMemberEntity } from "src/shared/entities/base.entity";
import { Weight } from "src/shared/enum/global-enum";
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

  @ManyToOne(() => Location, location => location.shipments)
  location: Location;
}
