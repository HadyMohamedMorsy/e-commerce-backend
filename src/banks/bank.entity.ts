import { Location } from "src/locations/location.entity";
import { BaseMemberEntity } from "src/shared/entities/base.entity";
import { User } from "src/users/user.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
@Entity("banks")
export class Bank extends BaseMemberEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: "account_name" })
  accountName: string;

  @Column({ name: "account_number" })
  accountNumber: string;

  @Column({ name: "featured_image", nullable: true })
  featuredImage: string;

  @Column({ name: "branch_name" })
  branchName: string;

  @Column({ name: "bank_name" })
  bankName: string;

  @Column()
  iban: string;

  @Column({ name: "swift_code" })
  swiftCode: string;

  @Column({ name: "is_active", type: "boolean", default: true })
  isActive: boolean;

  @ManyToOne(() => Location)
  country: Location;

  @ManyToOne(() => Location)
  region: Location;

  @ManyToOne(() => Location)
  city: Location;

  @ManyToOne(() => Location)
  area: Location;

  @ManyToOne(() => User, user => user.id, { onDelete: "SET NULL" })
  createdBy: User;
}
