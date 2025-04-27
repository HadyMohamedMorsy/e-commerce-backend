import { BaseMemberEntity } from "src/shared/entities/base.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Location } from "../locations/location.entity";

@Entity("shipments")
export class Shipment extends BaseMemberEntity {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column({
    type: "enum",
    enum: ["item", "weight"],
    default: "item",
  })
  type: "item" | "weight";

  @Column({ name: "kg_price", type: "decimal", precision: 10, scale: 2 })
  kgPrice: number;

  @Column({ name: "shipment_price", type: "decimal", precision: 10, scale: 2 })
  shipmentPrice: number;

  @ManyToOne(() => Location, location => location.shipments)
  location: Location;
}
