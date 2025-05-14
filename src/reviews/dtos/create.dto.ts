import {
  IsBoolean,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Max,
  Min,
} from "class-validator";
import { Product } from "src/products/products.entity";
import { User } from "src/users/user.entity";

export class ReviewDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsOptional()
  @IsBoolean()
  isApproved: boolean = false;

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
  likesCount?: number;

  createdBy: User;

  product: Product;
}
