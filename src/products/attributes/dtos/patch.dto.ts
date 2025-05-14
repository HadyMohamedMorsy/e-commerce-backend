import { IsArray, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";
import { Product } from "src/products/products.entity";

export class PatchAttributeDto {
  @IsNumber()
  @IsNotEmpty()
  id: number;

  @IsString()
  @IsOptional()
  name?: string;

  @IsString()
  @IsOptional()
  value?: string;

  @IsString()
  @IsOptional()
  image?: string;

  @IsArray()
  @IsOptional()
  images?: string[];

  @IsNumber()
  @IsOptional()
  priceChange?: number;

  @IsNumber()
  @IsOptional()
  quantity?: number;

  product?: Product;
}
