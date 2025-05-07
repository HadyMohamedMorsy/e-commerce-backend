import { Type } from "class-transformer";
import { IsArray, IsNotEmpty, IsNumber, ValidateNested } from "class-validator";
import { User } from "src/users/user.entity";

export class CreateCartItemDto {
  @IsNumber()
  @IsNotEmpty()
  productId: number;

  @IsNumber()
  @IsNotEmpty()
  quantity: number;
}

export class CartDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateCartItemDto)
  cartItems: CreateCartItemDto[];

  user: User;

  createdBy: User;
}
