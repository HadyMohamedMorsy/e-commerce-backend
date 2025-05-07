import { IsBoolean, IsNumber, IsOptional } from "class-validator";
import { Product } from "src/products/products.entity";
import { User } from "src/users/user.entity";

export class WishlistDto {
  @IsNumber()
  productId: number;

  @IsBoolean()
  @IsOptional()
  isFav?: boolean;

  createdBy: User;

  product: Product;
}
