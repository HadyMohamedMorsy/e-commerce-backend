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

  categories: Category[];

  createdBy: User;
}
