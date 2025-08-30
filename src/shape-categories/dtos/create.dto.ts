import { IsEnum, IsNotEmpty, IsString } from "class-validator";
import { FacialFeatureType } from "src/shared/enum/global-enum";
import { User } from "src/users/user.entity";

export class CreateShapeCategoryDto {
  @IsEnum(FacialFeatureType)
  @IsNotEmpty()
  type: FacialFeatureType;

  @IsString()
  @IsNotEmpty()
  name: string;

  createdBy: User;
}
