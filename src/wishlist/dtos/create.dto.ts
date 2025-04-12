import { IsNumber } from "class-validator";

export class WishlistDto {
  @IsNumber()
  productId: number;

  @IsNumber()
  userId: number;
}
