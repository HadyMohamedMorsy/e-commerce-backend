import { IsArray, IsBoolean, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class BlogDto {
  @IsOptional()
  @IsNumber()
  order?: number;

  @IsOptional()
  @IsString()
  videoType?: string;

  @IsOptional()
  @IsString()
  video?: string;

  @IsOptional()
  @IsNumber()
  views?: number;

  @IsOptional()
  @IsBoolean()
  isFeatured?: boolean;

  @IsOptional()
  @IsBoolean()
  isPublished?: boolean;

  @IsNotEmpty()
  @IsString()
  startDate: string;

  @IsOptional()
  @IsString()
  endDate?: string | null;

  @IsNotEmpty()
  @IsString()
  title: string;

  @IsOptional()
  @IsString()
  subTitle?: string;

  @IsNotEmpty()
  @IsString()
  postType: string;

  @IsNotEmpty()
  @IsString()
  slug: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsOptional()
  @IsString()
  shortDescription?: string;

  @IsOptional()
  @IsString()
  metaTitle?: string | null;

  @IsOptional()
  @IsString()
  metaDescription?: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  featuredImages?: string[];

  @IsOptional()
  @IsString()
  thumb?: string;

  @IsOptional()
  @IsString()
  mediaType?: string;
}
