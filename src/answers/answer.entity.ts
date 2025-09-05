import { Quiz } from "src/quiz/quiz.entity";
import { BaseMemberEntity } from "src/shared/entities/base.entity";
import { User } from "src/users/user.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Book } from "../books/book.entity";

@Entity("answers")
export class Answer extends BaseMemberEntity {
  @PrimaryGeneratedColumn()
  id?: number | null;

  @Column({ type: "text", nullable: false })
  answerText: string;

  @ManyToOne(() => Quiz, quiz => quiz.answers)
  quiz: Quiz;

  @ManyToOne(() => Book, book => book.answers)
  book: Book;

  @ManyToOne(() => User, { nullable: true, onDelete: "SET NULL" })
  createdBy: User;
}
