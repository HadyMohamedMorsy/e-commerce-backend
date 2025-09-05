import { Answer } from "src/answers/answer.entity";
import { BaseMemberEntity } from "src/shared/entities/base.entity";
import { QuestionType } from "src/shared/enum/global-enum";
import { User } from "src/users/user.entity";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity("quizzes")
export class Quiz extends BaseMemberEntity {
  @PrimaryGeneratedColumn()
  id?: number | null;

  @Column({ type: "text", nullable: true })
  question: string;

  @Column({ type: "enum", enum: QuestionType, default: QuestionType.INPUT })
  questionType: QuestionType;

  @OneToMany(() => Answer, answer => answer.quiz)
  answers: Answer[];

  @ManyToOne(() => User, { nullable: true, onDelete: "SET NULL" })
  createdBy: User;
}
