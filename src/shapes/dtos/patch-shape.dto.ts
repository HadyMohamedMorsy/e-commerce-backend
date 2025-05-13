import { PartialType } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsInt, IsNotEmpty } from "class-validator";
import { CreateShapeDto } from "./create-shape.dto";

export class PatchShapeDto extends PartialType(CreateShapeDto) {
  @IsInt()
  @Type(() => Number)
  @IsNotEmpty()
  id: number;
}
