import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity("contacts")
export class Contact {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column({ nullable: true })
  phone?: string;

  @Column()
  subject: string;

  @Column({ type: "text" })
  message: string;

  @CreateDateColumn({ name: "created_at" })
  createdAt?: string;

  @UpdateDateColumn({ name: "updated_at" })
  updatedAt?: string;
}
