import { PartialType } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsInt, IsNotEmpty } from "class-validator";
import { BookDto } from "./create.dto";

export class PatchBookDto extends PartialType(BookDto) {
  @IsInt()
  @Type(() => Number)
  @IsNotEmpty()
  id: number;
}
