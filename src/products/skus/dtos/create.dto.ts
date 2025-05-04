import { IsNotEmpty, IsNumber, IsString } from "class-validator";
import { Product } from "src/products/products.entity";

export class SkuDto {
  @IsNumber()
  @IsNotEmpty()
  productId: number;

  @IsString()
  @IsNotEmpty()
  sku: string;

  @IsNumber()
  @IsNotEmpty()
  price: number;

  @IsNumber()
  @IsNotEmpty()
  quantity: number;

  product: Product;
}
