import { IsOptional, IsString } from "class-validator";
import { User } from "src/users/user.entity";

export class OrderCustomDto {
  @IsOptional()
  @IsString()
  status?: string;

  createdBy: User;
}
