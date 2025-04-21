import { FaqList } from "src/shared/enum/global-enum";
import { User } from "src/users/user.entity";
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity("faqs")
export class Faq {
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

  @ManyToOne(() => User)
  createdBy: User;

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
