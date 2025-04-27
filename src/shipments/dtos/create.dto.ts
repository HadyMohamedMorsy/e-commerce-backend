import { Type } from "class-transformer";
import { IsEnum, IsNumber, IsPositive } from "class-validator";
import { User } from "src/users/user.entity";

export class ShipmentDto {
  @IsEnum(["item", "weight"])
  type: "item" | "weight";

  @IsNumber()
  @IsPositive()
  @Type(() => Number)
  kgPrice: number;

  @IsNumber()
  @IsPositive()
  @Type(() => Number)
  shipmentPrice: number;

  @IsNumber()
  locationId: number;

  location: Location;

  createdBy: User;
}
