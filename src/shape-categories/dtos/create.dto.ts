import { IsEnum, IsNotEmpty, IsString } from "class-validator";
import { FacialFeatureType, ShapePartType, ShapeType } from "src/shared/enum/global-enum";
import { User } from "src/users/user.entity";

export class CreateShapeCategoryDto {
  @IsEnum(FacialFeatureType)
  @IsNotEmpty()
  type: FacialFeatureType;

  @IsEnum(ShapeType)
  @IsNotEmpty()
  shapeType: string;

  @IsEnum(ShapePartType)
  @IsNotEmpty()
  part: ShapePartType;

  @IsString()
  @IsNotEmpty()
  name: string;

  createdBy: User;
}
