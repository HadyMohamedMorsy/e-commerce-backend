import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Location } from "../locations/location.entity";

@Entity("shipments")
export class Shipment {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column({
    type: "enum",
    enum: ["item", "weight"],
    default: "item",
  })
  type: "item" | "weight";

  @Column({ name: "is_active", default: true })
  isActive: boolean;

  @Column({ name: "kg_price", type: "decimal", precision: 10, scale: 2 })
  kgPrice: number;

  @Column({ name: "shipment_price", type: "decimal", precision: 10, scale: 2 })
  shipmentPrice: number;

  @ManyToOne(() => Location, location => location.shipments)
  @JoinColumn({ name: "location_id" })
  location: Location;
}
