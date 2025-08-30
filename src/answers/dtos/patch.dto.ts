import { PartialType } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsInt, IsNotEmpty } from "class-validator";
import { AnswerDto } from "./create.dto";

export class PatchAnswerDto extends PartialType(AnswerDto) {
  @IsInt()
  @Type(() => Number)
  @IsNotEmpty()
  id: number;
}
