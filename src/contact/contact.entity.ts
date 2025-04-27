import { BaseMemberEntity } from "src/shared/entities/base.entity";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("contacts")
export class Contact extends BaseMemberEntity {
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
}
