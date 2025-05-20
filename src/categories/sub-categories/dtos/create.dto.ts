import { IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString, MaxLength } from "class-validator";
import { Category } from "src/categories/category.entity";
import { CategoryType } from "src/shared/enum/global-enum";
import { User } from "src/users/user.entity";

export class SubCategoryDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  name: string;

  @IsNumber()
  @IsNotEmpty()
  categoryId: number;

  @IsString()
  @IsNotEmpty()
  slug: string;

  @IsString()
  @IsOptional()
  icon?: string;

  @IsEnum(CategoryType)
  @IsNotEmpty()
  categoryType: CategoryType;

  @IsString()
  @IsOptional()
  description?: string;

  @IsOptional()
  @IsString()
  image?: string;

  createdBy: User;

  category: Category;
}
