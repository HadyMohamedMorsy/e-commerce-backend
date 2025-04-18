import { IsBoolean, IsEnum, IsNumber, IsPositive } from "class-validator";

export class ShipmentDto {
  @IsEnum(["item", "weight"])
  type: "item" | "weight";

  @IsBoolean()
  is_active: boolean;

  @IsNumber()
  @IsPositive()
  kg_price: number;

  @IsNumber()
  @IsPositive()
  shipment_price: number;

  @IsNumber()
  location_id: number;
}
