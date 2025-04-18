import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity("banks")
export class Bank {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: "account_name" })
  accountName: string;

  @Column({ name: "account_number" })
  accountNumber: string;

  @Column({ name: "featured_image", nullable: true })
  featuredImage: string;

  @Column({ name: "is_active", default: 1 })
  isActive: number;

  @Column({ name: "branch_name" })
  branchName: string;

  @Column({ name: "bank_name" })
  bankName: string;

  @Column()
  iban: string;

  @Column({ name: "swift_code" })
  swiftCode: string;

  @Column({ name: "created_at", type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  createdAt: string;

  @ManyToOne(() => Location)
  @JoinColumn({ name: "country_id" })
  country: Location;

  @ManyToOne(() => Location)
  @JoinColumn({ name: "city_id" })
  city: Location;
}
