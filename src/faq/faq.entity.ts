import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity("faqs")
export class Faq {
  @PrimaryGeneratedColumn()
  id?: number | null;

  @Column({
    name: "select_questionable_type",
    type: "enum",
    enum: ["Product", "All"],
    default: "All",
  })
  selectQuestionableType: "Product" | "All";

  @Column({ type: "text", nullable: true })
  question: string | null;

  @Column({ type: "text", nullable: true })
  answer: string | null;
}
