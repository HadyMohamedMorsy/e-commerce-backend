import { IsNotEmpty, IsOptional, IsString } from "class-validator";
import { Product } from "src/products/products.entity";

export class AttributeDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  value: string;

  @IsNotEmpty()
  productId: number;

  @IsOptional()
  @IsString()
  image: string;

  product: Product;
}
