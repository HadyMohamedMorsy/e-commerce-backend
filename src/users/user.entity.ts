import { Role, UserStatus } from "src/shared/enum/global-enum";
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { Address } from "../address/address.entity";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: "varchar",
    length: 96,
    nullable: true,
    name: "first_name",
  })
  firstName: string;

  @Column({
    type: "varchar",
    length: 96,
    nullable: true,
    name: "last_name",
  })
  lastName: string;

  @Column({
    type: "varchar",
    length: 96,
    nullable: true,
    unique: true,
  })
  username: string;

  @Column({ type: "enum", enum: Role, default: Role.SUPER_ADMIN })
  role: Role;

  @Column({ unique: true, length: 11, name: "phone_number" })
  phoneNumber: string;

  @Column({ nullable: true })
  avatar: string;

  @Column({ type: "date", name: "birth_of_date" })
  birthOfDate: Date;

  @Column({
    type: "varchar",
    length: 96,
    nullable: true,
    unique: true,
  })
  email: string;

  @Column({
    type: "varchar",
    length: 96,
    nullable: true,
  })
  password: string;

  @Column({
    type: "varchar",
    length: 96,
    nullable: true,
    name: "google_id",
  })
  googleId: string;

  @Column({
    type: "varchar",
    length: 96,
    nullable: true,
    name: "facebook_id",
  })
  facebookId: string;

  @Column({ type: "enum", enum: UserStatus, nullable: true })
  type: UserStatus;

  @OneToMany(() => Address, address => address.user)
  addresses: Address[];

  @ManyToOne(() => User)
  createdBy: User;

  @Column({ type: "boolean", default: true })
  isActive: boolean;

  @CreateDateColumn({
    type: "timestamp",
    default: () => "CURRENT_TIMESTAMP",
    name: "created_at",
  })
  createdAt: Date;

  @UpdateDateColumn({
    type: "timestamp",
    default: () => "CURRENT_TIMESTAMP",
    onUpdate: "CURRENT_TIMESTAMP",
    name: "updated_at",
  })
  updatedAt: Date;
}
