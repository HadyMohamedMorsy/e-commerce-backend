import { Type } from "class-transformer";
import { IsArray, IsBoolean, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";
import { Category } from "src/categories/category.entity";
import { User } from "src/users/user.entity";

export class BlogDto {
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  order?: number;

  @IsArray()
  @IsNumber({}, { each: true })
  categoryIds?: number[];

  @IsOptional()
  @IsBoolean()
  isFeatured?: boolean = false;

  @IsOptional()
  @IsBoolean()
  isPublished?: boolean = false;

  @IsNotEmpty()
  @IsString()
  startDate: string;

  @IsOptional()
  @IsString()
  endDate?: string | null;

  @IsNotEmpty()
  @IsString()
  title: string;

  @IsOptional()
  @IsString()
  subTitle?: string;

  @IsNotEmpty()
  @IsString()
  postType: string;

  @IsNotEmpty()
  @IsString()
  slug: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsOptional()
  @IsString()
  shortDescription?: string;

  @IsOptional()
  @IsString()
  metaTitle?: string | null;

  @IsOptional()
  @IsString()
  metaDescription?: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  featuredImages?: string[];

  @IsOptional()
  @IsString()
  thumb?: string;

  @IsOptional()
  @IsString()
  mediaType?: string;

  @IsOptional()
  @IsString()
  video?: string;

  categories: Category[];

  createdBy: User;
}
