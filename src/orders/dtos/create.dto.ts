import { Type } from "class-transformer";
import {
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from "class-validator";
import { OrderStatus, PaymentStatus } from "src/shared/enum/global-enum";
import { User } from "src/users/user.entity";
import { CreateOrderItemDto } from "./create-order-item.dto";

export class OrderDto {
  @IsNumber()
  @IsOptional()
  total: number;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateOrderItemDto)
  @IsOptional()
  orderItems: CreateOrderItemDto[];

  @IsString()
  @IsNotEmpty()
  paymentStatus: PaymentStatus;

  @IsString()
  @IsNotEmpty()
  status: OrderStatus;

  createdBy: User;
}
