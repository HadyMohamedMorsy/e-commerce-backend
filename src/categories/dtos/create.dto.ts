import { IsNotEmpty, IsOptional, IsString, MaxLength } from "class-validator";

export class CategoryDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  name: string;

  @IsString()
  @IsOptional()
  description?: string;
}
