import { IsNotEmpty, IsString } from "class-validator";
import { User } from "src/users/user.entity";

export class LocationDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  parent?: Location;

  createdBy: User;
}
