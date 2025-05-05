import { IsEnum, IsNotEmpty, IsOptional, IsString } from "class-validator";
import { CategoryType } from "src/shared/enum/global-enum";

export class CreateCategoryDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsEnum(CategoryType)
  categorType: CategoryType;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsString()
  image?: string;
}
