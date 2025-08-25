import { Product } from "src/products/products.entity";
import { BaseMemberEntity } from "src/shared/entities/base.entity";
import { FaqList } from "src/shared/enum/global-enum";
import { User } from "src/users/user.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity("faqs")
export class Faq extends BaseMemberEntity {
  @PrimaryGeneratedColumn()
  id?: number | null;

  @Column({
    name: "select_questionable_type",
    type: "enum",
    enum: FaqList,
    default: "All",
  })
  selectQuestionableType: "Product" | "All";

  @Column({ type: "text", nullable: true })
  question: string | null;

  @Column({ type: "text", nullable: true })
  answer: string | null;

  @ManyToOne(() => Product, { nullable: true, onDelete: "CASCADE" })
  products: Product[];

  @ManyToOne(() => User, { nullable: true, onDelete: "SET NULL" })
  createdBy: User;
}
