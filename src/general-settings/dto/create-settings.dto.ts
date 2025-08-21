import { Type } from "class-transformer";
import {
  IsBoolean,
  IsEmail,
  IsNumber,
  IsOptional,
  IsString,
  IsUrl,
  MaxLength,
  Min,
} from "class-validator";
import { User } from "src/users/user.entity";

export class CreateGeneralSettingsDto {
  // Store Information
  @IsString()
  @IsOptional()
  store_name?: string;

  @IsEmail()
  @IsOptional()
  store_email?: string;

  @IsString()
  @IsOptional()
  store_phone?: string;

  @IsString()
  @IsOptional()
  store_address?: string;

  // Currency and Payment Settings
  @IsString()
  @IsOptional()
  default_currency?: string;

  @IsString()
  @IsOptional()
  currency_symbol?: string;

  @IsNumber()
  @Type(() => Number)
  @Min(0)
  @IsOptional()
  tax_rate?: number;

  // Shipping Settings
  @IsNumber()
  @Type(() => Number)
  @Min(1)
  @IsOptional()
  shipping_days?: number;

  // Google Tag Manager
  @IsString()
  @IsOptional()
  gtm_container_id?: string;

  @IsString()
  @IsOptional()
  google_analytics_id?: string;

  // Omnisend Integration
  @IsString()
  @IsOptional()
  omnisend_api_key?: string;

  @IsBoolean()
  @IsOptional()
  omnisend_enabled?: boolean;

  // Social Media
  @IsUrl()
  @IsOptional()
  facebook_url?: string;

  @IsUrl()
  @IsOptional()
  instagram_url?: string;

  @IsUrl()
  @IsOptional()
  twitter_url?: string;

  // SEO Settings
  @IsString()
  @MaxLength(60)
  @IsOptional()
  meta_title?: string;

  @IsString()
  @MaxLength(160)
  @IsOptional()
  meta_description?: string;

  // Email Settings
  @IsString()
  @IsOptional()
  smtp_host?: string;

  @IsNumber()
  @Type(() => Number)
  @IsOptional()
  smtp_port?: number;

  @IsString()
  @IsOptional()
  smtp_username?: string;

  @IsString()
  @IsOptional()
  smtp_password?: string;

  @IsString()
  @IsOptional()
  smtp_encryption?: string;

  // Maintenance Mode
  @IsBoolean()
  @IsOptional()
  maintenance_mode?: boolean;

  @IsString()
  @IsOptional()
  maintenance_message?: string;

  createdBy: User;
}
