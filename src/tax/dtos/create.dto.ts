import { IsNotEmpty, IsNumber, IsString } from "class-validator";
import { User } from "src/users/user.entity";

export class TaxDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNumber()
  @IsNotEmpty()
  rate: number;

  @IsNumber()
  @IsNotEmpty()
  locationId: number;

  location: Location;

  createdBy: User;
}
