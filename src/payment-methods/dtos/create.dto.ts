import { IsOptional, IsString } from "class-validator";
import { User } from "src/users/user.entity";

export class PaymentMethodDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  icon?: string;

  @IsOptional()
  @IsString()
  slug?: string;

  createdBy: User;
}
