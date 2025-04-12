import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class ProductDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsString()
  @IsOptional()
  summary?: string;

  @IsString()
  @IsOptional()
  cover?: string;

  @IsString()
  @IsNotEmpty()
  categoryId: string;
}
