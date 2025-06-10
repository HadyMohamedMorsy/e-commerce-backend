import { Type } from "class-transformer";
import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";
import { Location } from "src/locations/location.entity";
import { User } from "src/users/user.entity";

export class AddressDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  addressLine1: string;

  @IsOptional()
  @IsString()
  addressLine2?: string;

  @IsNotEmpty()
  @IsNumber()
  @Type(() => Number)
  countryId: number;

  @IsNotEmpty()
  @IsNumber()
  @Type(() => Number)
  regionId: number;

  @IsNotEmpty()
  @IsNumber()
  @Type(() => Number)
  cityId: number;

  @IsNotEmpty()
  @IsNumber()
  @Type(() => Number)
  areaId: number;

  country: Location;

  region: Location;

  city: Location;

  area: Location;

  @IsNotEmpty()
  @IsString()
  postalCode: string;

  @IsOptional()
  @IsString()
  landmark?: string;

  @IsNotEmpty()
  @IsString()
  phoneNumber: string;

  createdBy: User;

  user: User;
}
