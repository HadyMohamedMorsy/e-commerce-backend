import { PartialType } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsInt, IsNotEmpty } from "class-validator";
import { AddressDto } from "./create.dto";

export class PatchAddressDto extends PartialType(AddressDto) {
  @IsInt()
  @Type(() => Number)
  @IsNotEmpty()
  id: number;
}
