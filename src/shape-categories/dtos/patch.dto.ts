import { PartialType } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsInt, IsNotEmpty } from "class-validator";
import { CreateShapeCategoryDto } from "./create.dto";

export class PatchShapeCategoryDto extends PartialType(CreateShapeCategoryDto) {
  @IsInt()
  @Type(() => Number)
  @IsNotEmpty()
  id: number;
}
