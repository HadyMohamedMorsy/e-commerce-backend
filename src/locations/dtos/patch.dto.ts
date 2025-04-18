import { PartialType } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsInt, IsNotEmpty } from "class-validator";
import { LocationDto } from "./create.dto";

export class PatchLocationDto extends PartialType(LocationDto) {
  @IsInt()
  @Type(() => Number)
  @IsNotEmpty()
  id: number;
}
