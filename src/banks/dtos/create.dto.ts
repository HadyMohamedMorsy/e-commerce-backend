import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";
import { User } from "src/users/user.entity";

export class BankDto {
  @IsNotEmpty()
  @IsString()
  accountName: string;

  @IsNotEmpty()
  @IsString()
  accountNumber: string;

  @IsOptional()
  @IsString()
  featuredImage?: string;

  @IsNotEmpty()
  @IsString()
  branchName: string;

  @IsNotEmpty()
  @IsString()
  bankName: string;

  @IsNotEmpty()
  @IsString()
  iban: string;

  @IsNotEmpty()
  @IsString()
  swiftCode: string;

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

  createdBy: User;
}
