import { PartialType } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber } from "class-validator";
import { AttributeDto } from "./create.dto";

export class PatchAttributeDto extends PartialType(AttributeDto) {
  @IsNumber()
  @IsNotEmpty()
  id: number;
}
