import { PartialType } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsInt, IsNotEmpty } from "class-validator";
import { FaqDto } from "./create.dto";

export class PatchFaqDto extends PartialType(FaqDto) {
  @IsInt()
  @Type(() => Number)
  @IsNotEmpty()
  id: number;
}
