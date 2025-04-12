import { PartialType } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsInt, IsNotEmpty } from "class-validator";
import { WishlistDto } from "./create.dto";

export class PatchWishlistsDto extends PartialType(WishlistDto) {
  @IsInt()
  @Type(() => Number)
  @IsNotEmpty()
  id: number;
}
