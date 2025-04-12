import { User } from "src/users/user.entity";
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity()
export class Address {
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

  @Column()
  country: string;

  @Column()
  city: string;

  @Column({ name: "postal_code" })
  postalCode: string;

  @Column({ nullable: true })
  landmark?: string;

  @Column({ name: "phone_number" })
  phoneNumber: string;

  @CreateDateColumn({ name: "created_at" })
  createdAt: Date;

  @UpdateDateColumn({
    type: "timestamp",
    default: () => "CURRENT_TIMESTAMP",
    onUpdate: "CURRENT_TIMESTAMP",
  })
  updated_at: Date;
}
