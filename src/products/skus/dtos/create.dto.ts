import { Type } from "class-transformer";
import { IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";
import { Product } from "src/products/products.entity";
import { DiscountType } from "src/shared/enum/global-enum";

export class SkuDto {
  @IsString()
  @IsNotEmpty()
  sku: string;

  @IsNumber()
  @IsNotEmpty()
  @Type(() => Number)
  price: number;

  @IsNumber()
  @IsNotEmpty()
  @Type(() => Number)
  quantity: number;

  @IsNumber()
  @IsOptional()
  @Type(() => Number)
  discount: number;

  @IsEnum(DiscountType)
  @IsOptional()
  discountType: DiscountType;

  product: Product;
}
