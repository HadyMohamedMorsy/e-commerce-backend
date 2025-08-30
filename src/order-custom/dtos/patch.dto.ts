import { PartialType } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsInt, IsNotEmpty } from "class-validator";
import { OrderCustomDto } from "./create.dto";

export class PatchOrderCustomDto extends PartialType(OrderCustomDto) {
  @IsInt()
  @Type(() => Number)
  @IsNotEmpty()
  id: number;
}
