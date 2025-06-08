import { Type } from "class-transformer";
import { IsArray, IsNotEmpty, IsOptional, IsString } from "class-validator";
import { Category } from "src/categories/category.entity";
import { User } from "src/users/user.entity";

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

  @IsArray()
  @Type(() => Number)
  @IsNotEmpty()
  categoryIds: number[];

  @IsString()
  @IsNotEmpty()
  slug?: string;

  @IsString()
  @IsOptional()
  metaTitle?: string;

  @IsArray()
  @IsNotEmpty()
  images: string[];

  @IsString()
  @IsOptional()
  metaDescription?: string;

  categories: Category[];

  createdBy: User;
}
