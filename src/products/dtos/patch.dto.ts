import { PartialType } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsInt, IsNotEmpty } from "class-validator";
import { ProductDto } from "./create.dto";

export class PatchProductDto extends PartialType(ProductDto) {
  @IsInt()
  @Type(() => Number)
  @IsNotEmpty()
  id: number;
}
