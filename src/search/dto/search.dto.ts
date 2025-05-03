import { IsEnum, IsNotEmpty, IsString } from "class-validator";
import { SearchType } from "../search.service";

export class SearchDto {
  @IsEnum(SearchType)
  @IsNotEmpty()
  type: SearchType;

  @IsString()
  @IsNotEmpty()
  query: string;
}
