import { IsNotEmpty, IsString } from "class-validator";

export class SubscriptionDto {
  @IsString()
  @IsNotEmpty()
  email: string;
}
