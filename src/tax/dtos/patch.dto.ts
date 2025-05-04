import { PartialType } from "@nestjs/swagger";
import { IsNumber } from "class-validator";
import { TaxDto } from "./create.dto";

export class PatchTaxDto extends PartialType(TaxDto) {
  @IsNumber()
  id: number;
}
