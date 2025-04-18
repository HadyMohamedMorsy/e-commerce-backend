import { PartialType } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsInt, IsNotEmpty } from "class-validator";
import { ReviewDto } from "./create.dto";

export class PatchReviewDto extends PartialType(ReviewDto) {
  @IsInt()
  @Type(() => Number)
  @IsNotEmpty()
  id: number;
}
