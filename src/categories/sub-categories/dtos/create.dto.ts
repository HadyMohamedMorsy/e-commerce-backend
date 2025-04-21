import { IsNotEmpty, IsNumber, IsOptional, IsString, MaxLength } from "class-validator";
import { User } from "src/users/user.entity";

export class SubCategoryDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  name: string;

  @IsNumber()
  @IsNotEmpty()
  category_id: number;

  @IsString()
  @IsOptional()
  description?: string;

  createdBy: User;
}
