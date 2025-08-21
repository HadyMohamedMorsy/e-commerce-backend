import { Body, Controller, Delete, HttpCode, Post, Put, Req } from "@nestjs/common";
import { Auth } from "src/shared/decorators/auth.decorator";
import { Roles } from "src/shared/decorators/roles.decorator";
import { AuthType, Role } from "src/shared/enum/global-enum";
import { RelationOptions, SelectOptions } from "src/shared/interfaces/query.interface";
import { CreateGeneralSettingsDto } from "./dto/create-settings.dto";
import { UpdateGeneralSettingsDto } from "./dto/update-settings-packages.dto";
import { GeneralSettingsService } from "./settings.service";

@Controller("general-settings")
export class GeneralSettingsController implements SelectOptions, RelationOptions {
  constructor(private readonly service: GeneralSettingsService) {}

  public selectOptions(): Record<string, boolean> {
    return {
      id: true,
      store_name: true,
      store_email: true,
      store_phone: true,
      store_address: true,
      default_currency: true,
      currency_symbol: true,
      tax_rate: true,
      shipping_days: true,
      gtm_container_id: true,
      google_analytics_id: true,
      omnisend_api_key: true,
      omnisend_enabled: true,
      facebook_url: true,
      instagram_url: true,
      twitter_url: true,
      meta_title: true,
      meta_description: true,
      smtp_host: true,
      smtp_port: true,
      smtp_username: true,
      smtp_password: true,
      smtp_encryption: true,
      maintenance_mode: true,
      maintenance_message: true,
      created_at: true,
      updated_at: true,
    };
  }

  public getRelationOptions(): Record<string, any> {
    return {
      createdBy: {
        id: true,
        firstName: true,
        lastName: true,
      },
    };
  }

  @Post("/index")
  @HttpCode(200)
  @Auth(AuthType.None)
  async findAll(@Body() filterQueryDto: any) {
    return this.service.findAll(filterQueryDto);
  }

  @Post("/show")
  @HttpCode(200)
  async findOne(@Body() filterQueryDto: any) {
    return this.service.findOne(filterQueryDto);
  }

  @Post("/store")
  @Auth(AuthType.Bearer)
  @Roles(Role.SUPER_ADMIN, Role.SYSTEM_ADMIN, Role.CONTENT_MANAGER)
  async create(@Body() create: CreateGeneralSettingsDto, @Req() req: Request) {
    return await this.service.create(
      {
        store_name: create.store_name,
        store_email: create.store_email,
        store_phone: create.store_phone,
        store_address: create.store_address,
        default_currency: create.default_currency,
        currency_symbol: create.currency_symbol,
        tax_rate: create.tax_rate,
        shipping_days: create.shipping_days,
        gtm_container_id: create.gtm_container_id,
        google_analytics_id: create.google_analytics_id,
        omnisend_api_key: create.omnisend_api_key,
        omnisend_enabled: create.omnisend_enabled,
        facebook_url: create.facebook_url,
        instagram_url: create.instagram_url,
        twitter_url: create.twitter_url,
        meta_title: create.meta_title,
        meta_description: create.meta_description,
        smtp_host: create.smtp_host,
        smtp_port: create.smtp_port,
        smtp_username: create.smtp_username,
        smtp_password: create.smtp_password,
        smtp_encryption: create.smtp_encryption,
        maintenance_mode: create.maintenance_mode,
        maintenance_message: create.maintenance_message,
        createdBy: req["createdBy"],
      },
      this.selectOptions(),
      this.getRelationOptions(),
    );
  }

  @Put("/update")
  @Auth(AuthType.Bearer)
  @Roles(Role.SUPER_ADMIN, Role.SYSTEM_ADMIN, Role.CONTENT_MANAGER)
  async update(@Body() update: UpdateGeneralSettingsDto, @Req() req: Request) {
    return await this.service.update(
      {
        id: update.id,
        store_name: update.store_name,
        store_email: update.store_email,
        store_phone: update.store_phone,
        store_address: update.store_address,
        default_currency: update.default_currency,
        currency_symbol: update.currency_symbol,
        tax_rate: update.tax_rate,
        shipping_days: update.shipping_days,
        gtm_container_id: update.gtm_container_id,
        google_analytics_id: update.google_analytics_id,
        omnisend_api_key: update.omnisend_api_key,
        omnisend_enabled: update.omnisend_enabled,
        facebook_url: update.facebook_url,
        instagram_url: update.instagram_url,
        twitter_url: update.twitter_url,
        meta_title: update.meta_title,
        meta_description: update.meta_description,
        smtp_host: update.smtp_host,
        smtp_port: update.smtp_port,
        smtp_username: update.smtp_username,
        smtp_password: update.smtp_password,
        smtp_encryption: update.smtp_encryption,
        maintenance_mode: update.maintenance_mode,
        maintenance_message: update.maintenance_message,
        createdBy: req["createdBy"],
      },
      this.selectOptions(),
      this.getRelationOptions(),
    );
  }

  @Delete("/delete")
  async delete(@Body() id: number) {
    return this.service.delete(id);
  }
}
