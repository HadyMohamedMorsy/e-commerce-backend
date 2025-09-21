import { PartialType } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsInt, IsNotEmpty } from "class-validator";
import { SubscriptionDto } from "./create.dto";

export class PatchSubscriptionDto extends PartialType(SubscriptionDto) {
  @IsInt()
  @Type(() => Number)
  @IsNotEmpty()
  id: number;
}
