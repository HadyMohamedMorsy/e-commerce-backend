import { IsNotEmpty, IsOptional, IsString, MaxLength } from "class-validator";
import { User } from "src/users/user.entity";

export class CategoryDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  name: string;

  @IsString()
  @IsOptional()
  description?: string;

  createdBy: User;

  @IsOptional()
  @IsString()
  image?: string;
}
