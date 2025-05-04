import { PartialType } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber } from "class-validator";
import { SkuDto } from "./create.dto";

export class PatchSkuDto extends PartialType(SkuDto) {
  @IsNumber()
  @IsNotEmpty()
  id: number;
}
