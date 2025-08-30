import { PartialType } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsInt, IsNotEmpty } from "class-validator";
import { QuizDto } from "./create.dto";

export class PatchQuizDto extends PartialType(QuizDto) {
  @IsInt()
  @Type(() => Number)
  @IsNotEmpty()
  id: number;
}
