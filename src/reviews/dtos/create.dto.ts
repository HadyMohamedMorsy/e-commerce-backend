import {
  IsArray,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Max,
  Min,
} from "class-validator";

export class ReviewDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsOptional()
  @IsInt()
  is_approved?: number;

  @IsNotEmpty()
  @IsString()
  comment: string;

  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  @Max(5)
  rate: number;

  @IsOptional()
  @IsInt()
  @Min(0)
  @Max(1)
  is_liked?: 0 | 1;

  @IsOptional()
  @IsInt()
  likes_count?: number;

  @IsNotEmpty()
  @IsString()
  creator_name: string;

  @IsNotEmpty()
  @IsString()
  creator_image: string;

  @IsArray()
  @IsString({ each: true })
  media: string[];
}
