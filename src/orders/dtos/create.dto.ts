// src/orders/dto/create-order.dto.ts
import { IsNotEmpty, IsNumber } from "class-validator";

export class OrderDto {
  @IsNumber()
  @IsNotEmpty()
  userId: number;

  @IsNumber()
  @IsNotEmpty()
  total: number;
}
