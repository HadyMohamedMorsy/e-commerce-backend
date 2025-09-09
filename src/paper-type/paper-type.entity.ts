import { BaseMemberEntity } from "src/shared/entities/base.entity";
import { User } from "src/users/user.entity";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { OrderCustom } from "../order-custom/order-custom.entity";

@Entity("paper_types")
export class PaperType extends BaseMemberEntity {
  @PrimaryGeneratedColumn()
  id?: number | null;

  @Column({ type: "varchar", length: 255, nullable: false })
  paperName: string;

  @Column({ type: "decimal", precision: 10, scale: 2, nullable: false, default: 0 })
  price: number;

  @OneToMany(() => OrderCustom, orderCustom => orderCustom.paperType)
  orderCustoms: OrderCustom[];

  @ManyToOne(() => User, { nullable: true, onDelete: "SET NULL" })
  createdBy: User;
}
