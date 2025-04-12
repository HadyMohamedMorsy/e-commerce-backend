import { PartialType } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsInt, IsNotEmpty } from "class-validator";
import { OrderDto } from "./create.dto";

export class PatchOrderDto extends PartialType(OrderDto) {
  @IsInt()
  @Type(() => Number)
  @IsNotEmpty()
  id: number;
}
