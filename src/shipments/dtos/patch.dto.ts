import { PartialType } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsInt, IsNotEmpty } from "class-validator";
import { ShipmentDto } from "./create.dto";

export class PatchShipmentDto extends PartialType(ShipmentDto) {
  @IsInt()
  @Type(() => Number)
  @IsNotEmpty()
  id: number;
}
