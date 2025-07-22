import { Type } from "class-transformer";
import {
  IsArray,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  Min,
} from "class-validator";
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

export enum SortOrder {
  ASC = "asc",
  DESC = "desc",
}

export class ProductFilterDto {
  @IsString()
  @IsNotEmpty()
  categorySlug: string;

  @IsNumber()
  @IsOptional()
  @IsPositive()
  @Type(() => Number)
  minPrice?: number;

  @IsNumber()
  @IsOptional()
  @IsPositive()
  @Type(() => Number)
  maxPrice?: number;

  @IsNumber()
  @IsOptional()
  @IsPositive()
  @Type(() => Number)
  length?: number;

  @IsNumber()
  @IsOptional()
  @Min(0)
  @Type(() => Number)
  start?: number;

  @IsEnum(SortOrder)
  @IsOptional()
  sort?: SortOrder;
}
