import { IsInt, IsNotEmpty, IsNumber, IsOptional, IsString, Max, Min } from "class-validator";
import { User } from "src/users/user.entity";

export class ReviewDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsOptional()
  @IsInt()
  is_approved?: number;

  @IsNotEmpty()
  @IsString()
  comment: string;

  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  @Max(5)
  rate: number;

  @IsOptional()
  @IsInt()
  @Min(0)
  @Max(1)
  is_liked?: 0 | 1;

  @IsOptional()
  @IsInt()
  likes_count?: number;

  createdBy: User;
}
