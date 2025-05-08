import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";
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

  product?: Product;
}
