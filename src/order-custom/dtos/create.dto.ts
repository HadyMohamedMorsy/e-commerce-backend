import { Type } from "class-transformer";
import { IsArray, IsNumber, IsOptional, IsString } from "class-validator";
import { User } from "src/users/user.entity";

export class OrderCustomDto {
  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  images?: string[];

  @IsNumber()
  @IsOptional()
  @Type(() => Number)
  couponId?: number;

  @IsNumber()
  @IsOptional()
  @Type(() => Number)
  paperTypeId?: number;

  @IsNumber()
  @IsOptional()
  @Type(() => Number)
  paymentMethodId?: number;

  @IsArray()
  @IsNumber({}, { each: true })
  @IsOptional()
  @Type(() => Number)
  booksIds?: number[];

  createdBy: User;
}
