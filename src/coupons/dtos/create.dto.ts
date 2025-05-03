import { Type } from "class-transformer";
import { IsBoolean, IsDateString, IsEnum, IsNotEmpty, IsNumber, IsString } from "class-validator";
import { CouponType } from "src/shared/enum/global-enum";
import { User } from "src/users/user.entity";

export class CouponDto {
  @IsNotEmpty()
  @IsString()
  code: string;

  @IsNotEmpty()
  @IsEnum(CouponType)
  couponType: CouponType;

  @IsNotEmpty()
  @IsNumber()
  @Type(() => Number)
  discount: number;

  @IsNotEmpty()
  @IsString()
  discountType: string;

  @IsNotEmpty()
  @IsNumber()
  @Type(() => Number)
  minOrderTotalPrice: number;

  @IsNotEmpty()
  @IsNumber()
  @Type(() => Number)
  minOrderItemCount: number;

  @IsNotEmpty()
  @IsBoolean()
  isActive: boolean = true;

  @IsNotEmpty()
  @IsDateString()
  expiry_date: string;

  @IsNumber()
  min_order_total_price: number = 0;

  @IsNumber()
  min_order_item_count: number = 0;

  createdBy: User;
}
