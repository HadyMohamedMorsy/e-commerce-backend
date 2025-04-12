// src/products/dto/create-attribute.dto.ts
import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateAttributeDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  value: string;

  @IsNumber()
  @IsNotEmpty()
  productId: number;
}
