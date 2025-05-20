import { IsEnum, IsNotEmpty, IsOptional, IsString, MaxLength } from "class-validator";
import { CategoryType } from "src/shared/enum/global-enum";
import { User } from "src/users/user.entity";

export class CategoryDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  name: string;

  @IsEnum(CategoryType)
  @IsNotEmpty()
  categoryType: CategoryType;

  @IsString()
  @IsNotEmpty()
  slug: string;

  @IsString()
  @IsOptional()
  icon?: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsOptional()
  @IsString()
  image?: string;

  createdBy: User;
}
