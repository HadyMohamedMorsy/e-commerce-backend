import { PartialType } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsInt, IsNotEmpty } from "class-validator";
import { PaperTypeDto } from "./create.dto";

export class PatchPaperTypeDto extends PartialType(PaperTypeDto) {
  @IsInt()
  @Type(() => Number)
  @IsNotEmpty()
  id: number;
}
