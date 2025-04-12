import { PartialType } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsInt, IsNotEmpty } from "class-validator";
import { CartDto } from "./create.dto";

export class PatchCartDto extends PartialType(CartDto) {
  @IsInt()
  @Type(() => Number)
  @IsNotEmpty()
  id: number;
}
