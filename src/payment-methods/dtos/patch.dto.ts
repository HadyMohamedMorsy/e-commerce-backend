import { PartialType } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsInt, IsNotEmpty } from "class-validator";
import { PaymentMethodDto } from "./create.dto";

export class PatchPaymentMethodDto extends PartialType(PaymentMethodDto) {
  @IsInt()
  @Type(() => Number)
  @IsNotEmpty()
  id: number;
}
