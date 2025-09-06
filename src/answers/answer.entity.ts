import { Quiz } from "src/quiz/quiz.entity";
import { BaseMemberEntity } from "src/shared/entities/base.entity";
import { User } from "src/users/user.entity";
import { Column, Entity, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Book } from "../books/book.entity";

@Entity("answers")
export class Answer extends BaseMemberEntity {
  @PrimaryGeneratedColumn()
  id?: number | null;

  @Column({ type: "text", nullable: false })
  answerText: string;

  @ManyToOne(() => Quiz, quiz => quiz.answers)
  quiz: Quiz;

  @ManyToMany(() => Book, book => book.answers)
  @JoinTable({
    name: "answer_books",
    joinColumn: { name: "answer_id", referencedColumnName: "id" },
    inverseJoinColumn: { name: "book_id", referencedColumnName: "id" },
  })
  books: Book[];

  @ManyToOne(() => User, { nullable: true, onDelete: "SET NULL" })
  createdBy: User;
}
