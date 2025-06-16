import { Type } from "class-transformer";
import { IsBoolean, IsNotEmpty, IsNumber, IsOptional, IsString, Max, Min } from "class-validator";
import { Product } from "src/products/products.entity";
import { User } from "src/users/user.entity";

export class ReviewDto {
  @IsOptional()
  @IsBoolean()
  isApproved: boolean = false;

  @IsNotEmpty()
  @IsString()
  comment: string;

  @IsNotEmpty()
  @IsNumber()
  @Type(() => Number)
  @Min(0)
  @Max(5)
  rate: number;

  createdBy: User;
  product: Product;
}
