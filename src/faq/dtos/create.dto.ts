import { IsEnum, IsOptional, IsString } from "class-validator";

export class FaqDto {
  @IsOptional()
  @IsEnum(["Product", "All"], {
    message: 'Questionable type must be either "Product" or "All"',
  })
  select_questionable_type?: "Product" | "All" = "All";

  @IsOptional()
  @IsString()
  question?: string | null;

  @IsOptional()
  @IsString()
  answer?: string | null;
}
