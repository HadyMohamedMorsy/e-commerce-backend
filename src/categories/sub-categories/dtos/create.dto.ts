import { IsNotEmpty, IsNumber, IsOptional, IsString, MaxLength } from "class-validator";
import { Category } from "src/categories/category.entity";
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
  @IsOptional()
  description?: string;

  createdBy: User;

  category: Category;
}
