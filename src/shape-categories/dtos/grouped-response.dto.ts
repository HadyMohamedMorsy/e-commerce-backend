import { FacialFeatureType, ShapeType } from "src/shared/enum/global-enum";

export class GroupedShapeCategoryResponseDto {
  id: number;
  type: FacialFeatureType;
  shapeType: ShapeType;
  items: string[];
}
