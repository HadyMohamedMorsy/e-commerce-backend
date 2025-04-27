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
  countryId: number;

  @IsNotEmpty()
  @IsNumber()
  regionId: number;

  @IsNotEmpty()
  @IsNumber()
  cityId: number;

  @IsNotEmpty()
  @IsNumber()
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
}
