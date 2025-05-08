import { IsEnum, IsInt, IsOptional, IsString } from "class-validator";
import { Product } from "src/products/products.entity";
import { FaqList } from "src/shared/enum/global-enum";
import { User } from "src/users/user.entity";

export class FaqDto {
  @IsOptional()
  @IsEnum(FaqList, {
    message: 'Questionable type must be either "Product" or "All"',
  })
  selectQuestionableType: FaqList;

  @IsOptional()
  @IsString()
  question?: string | null;

  @IsOptional()
  @IsString()
  answer?: string | null;

  @IsOptional()
  @IsInt()
  productId?: number;

  createdBy: User;

  product: Product;
}
