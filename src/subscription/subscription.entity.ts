import { BaseMemberEntity } from "src/shared/entities/base.entity";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("sub")
export class Sub extends BaseMemberEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column("text", { unique: true })
  email: string;
}
