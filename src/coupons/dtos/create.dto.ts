import { IsDateString, IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CouponDto {
  @IsNotEmpty()
  @IsString()
  code: string;

  @IsNotEmpty()
  @IsString()
  coupon_type: string;

  @IsNotEmpty()
  @IsNumber()
  discount: number;

  @IsNotEmpty()
  @IsString()
  discount_type: string;

  @IsNotEmpty()
  @IsDateString()
  expiry_date: string;

  @IsNumber()
  min_order_total_price: number = 0;

  @IsNumber()
  min_order_item_count: number = 0;
}
