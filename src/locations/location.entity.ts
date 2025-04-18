import { Shipment } from "src/shipments/shipment.entity";
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity()
export class Location {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: "location_id", nullable: true })
  locationId: number | null;

  @Column({ type: "varchar", length: 255, nullable: true })
  name: string | null; // Nullable string field (max 255 chars)

  @OneToMany(() => Shipment, shipment => shipment.location)
  shipments: Shipment[];

  @CreateDateColumn({ name: "created_at" })
  createdAt: Date;

  @UpdateDateColumn({
    type: "timestamp",
    default: () => "CURRENT_TIMESTAMP",
    onUpdate: "CURRENT_TIMESTAMP",
  })
  updated_at: Date;
}
