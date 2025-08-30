import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";
import { User } from "src/users/user.entity";

export class BookDto {
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  title?: string;

  @IsOptional()
  @IsNumber()
  @IsNotEmpty()
  price?: number;

  @IsOptional()
  @IsString()
  svg?: string;

  @IsOptional()
  @IsString()
  type?: "cover" | "page";

  createdBy: User;
}
