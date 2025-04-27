import { Location } from "src/locations/location.entity";
import { BaseMemberEntity } from "src/shared/entities/base.entity";
import { User } from "src/users/user.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
@Entity()
export class Address extends BaseMemberEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, user => user.addresses)
  user: User;

  @Column()
  title: string;

  @Column({ name: "address_line_1" })
  addressLine1: string;

  @Column({ name: "address_line_2", nullable: true })
  addressLine2?: string;

  @ManyToOne(() => Location)
  country: Location;

  @ManyToOne(() => Location)
  region: Location;

  @ManyToOne(() => Location)
  city: Location;

  @ManyToOne(() => Location)
  area: Location;

  @Column({ name: "postal_code" })
  postalCode: string;

  @Column({ nullable: true })
  landmark?: string;

  @Column({ name: "phone_number" })
  phoneNumber: string;
}
