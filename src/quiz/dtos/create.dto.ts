import { IsEnum, IsNotEmpty, IsOptional, IsString } from "class-validator";
import { QuestionType } from "src/shared/enum/global-enum";
import { User } from "src/users/user.entity";

export class QuizDto {
  @IsString()
  @IsNotEmpty()
  question: string;

  @IsEnum(QuestionType)
  @IsOptional()
  questionType?: QuestionType;

  createdBy: User;
}
