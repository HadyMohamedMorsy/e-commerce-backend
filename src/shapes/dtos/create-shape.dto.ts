import { IsNotEmpty, IsOptional, IsString } from "class-validator";
import { User } from "src/users/user.entity";

export class CreateShapeDto {
  @IsString()
  @IsNotEmpty()
  type: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  shapeType: string;

  @IsString()
  @IsNotEmpty()
  colorCode: string;

  @IsString()
  @IsOptional()
  image?: string;

  createdBy: User;
}
