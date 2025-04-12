import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateSkuDto {
  @IsNumber()
  @IsNotEmpty()
  productId: number;

  @IsNumber()
  @IsNotEmpty()
  attributeId: number;

  @IsString()
  @IsNotEmpty()
  sku: string;

  @IsString()
  @IsNotEmpty()
  price: string;

  @IsNumber()
  @IsNotEmpty()
  quantity: number;
}
