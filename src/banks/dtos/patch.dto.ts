import { PartialType } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsInt, IsNotEmpty } from "class-validator";
import { BankDto } from "./create.dto";

export class PatchBankDto extends PartialType(BankDto) {
  @IsInt()
  @Type(() => Number)
  @IsNotEmpty()
  id: number;
}
