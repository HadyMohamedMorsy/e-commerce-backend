import { IsNotEmpty, IsNumber, IsString } from "class-validator";
import { User } from "src/users/user.entity";

export class PaperTypeDto {
  @IsNotEmpty()
  @IsString()
  paperName: string;

  @IsNotEmpty()
  @IsNumber()
  price: number;

  createdBy: User;
}
