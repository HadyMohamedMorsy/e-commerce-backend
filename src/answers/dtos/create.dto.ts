import { IsNotEmpty, IsOptional, IsString } from "class-validator";
import { Book } from "src/books/book.entity";
import { Quiz } from "src/quiz/quiz.entity";
import { User } from "src/users/user.entity";

export class AnswerDto {
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  answerText?: string;

  quiz: Quiz;
  book: Book;

  createdBy: User;
}
