import { IsNotEmpty, IsOptional, IsString } from "class-validator";
import { User } from "src/users/user.entity";

export class AnswerDto {
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  answerText?: string;

  createdBy: User;
}
