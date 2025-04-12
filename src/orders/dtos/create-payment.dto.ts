// src/orders/dto/create-payment.dto.ts
import { IsNotEmpty, IsNumber, IsString } from "class-validator";
import { PaymentStatus } from "src/shared/enum/global-enum";

export class CreatePaymentDto {
  @IsNumber()
  @IsNotEmpty()
  orderId: number;

  @IsNumber()
  @IsNotEmpty()
  amount: number;

  @IsString()
  @IsNotEmpty()
  provider: string;

  @IsString()
  @IsNotEmpty()
  status: PaymentStatus;
}
