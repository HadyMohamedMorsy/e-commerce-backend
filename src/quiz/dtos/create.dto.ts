import { IsNotEmpty, IsString } from "class-validator";
import { User } from "src/users/user.entity";

export class QuizDto {
  @IsString()
  @IsNotEmpty()
  question: string;

  createdBy: User;
}
