import { IsEnum, IsNotEmpty, IsString } from "class-validator";
import { FacialFeatureType, ShapeType } from "src/shared/enum/global-enum";
import { User } from "src/users/user.entity";

export class CreateShapeCategoryDto {
  @IsEnum(FacialFeatureType)
  @IsNotEmpty()
  type: FacialFeatureType;

  @IsEnum(ShapeType)
  @IsNotEmpty()
  shapeType: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  createdBy: User;
}
