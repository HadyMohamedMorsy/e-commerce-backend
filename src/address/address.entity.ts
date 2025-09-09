import { Location } from "src/locations/location.entity";
import { BaseMemberEntity } from "src/shared/entities/base.entity";
import { User } from "src/users/user.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
@Entity()
export class Address extends BaseMemberEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, user => user.addresses, { onDelete: "CASCADE" })
  user: User;

  @Column()
  title: string;

  @Column({ name: "address_line_1" })
  addressLine1: string;

  @Column({ name: "address_line_2", nullable: true })
  addressLine2?: string;

  @ManyToOne(() => Location, { onDelete: "CASCADE" })
  country: Location;

  @ManyToOne(() => Location, { onDelete: "CASCADE" })
  region: Location;

  @ManyToOne(() => Location, { onDelete: "CASCADE" })
  city: Location;

  @ManyToOne(() => Location, { onDelete: "CASCADE" })
  area: Location;

  @Column({ name: "postal_code" })
  postalCode: string;

  @Column({ nullable: true })
  landmark?: string;

  @Column({ name: "is_default", default: false })
  isDefault: boolean;

  @Column({ name: "phone_number" })
  phoneNumber: string;

  @ManyToOne(() => User, user => user.id, { onDelete: "SET NULL" })
  createdBy: User;
}
