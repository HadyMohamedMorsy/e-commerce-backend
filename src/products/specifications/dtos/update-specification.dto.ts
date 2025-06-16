import { PartialType } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsInt, IsNotEmpty } from "class-validator";
import { CreateSpecificationDto } from "./create-specification.dto";

export class UpdateSpecificationDto extends PartialType(CreateSpecificationDto) {
  @IsInt()
  @Type(() => Number)
  @IsNotEmpty()
  id: number;
}
