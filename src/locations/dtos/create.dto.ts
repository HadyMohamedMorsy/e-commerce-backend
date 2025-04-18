import { IsNumber, IsOptional, IsString } from "class-validator";

export class LocationDto {
  @IsOptional()
  @IsNumber()
  location_id?: number | null;

  @IsOptional()
  @IsString()
  name?: string | null;
}
