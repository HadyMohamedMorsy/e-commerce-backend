import { PartialType } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsInt, IsNotEmpty } from "class-validator";
import { CouponDto } from "./create.dto";

export class PatchCouponDto extends PartialType(CouponDto) {
  @IsInt()
  @Type(() => Number)
  @IsNotEmpty()
  id: number;
}
