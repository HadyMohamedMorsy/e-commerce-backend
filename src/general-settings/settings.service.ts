import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { BaseService } from "src/shared/base/base";
import { APIFeaturesService } from "src/shared/filters/filter.service";
import { ICrudService } from "src/shared/interfaces/crud-service.interface";
import { Repository } from "typeorm";
import { CreateGeneralSettingsDto } from "./dto/create-settings.dto";
import { UpdateGeneralSettingsDto } from "./dto/update-settings-packages.dto";
import { GeneralSettings } from "./general-settings.entity";

@Injectable()
export class GeneralSettingsService
  extends BaseService<GeneralSettings, CreateGeneralSettingsDto, UpdateGeneralSettingsDto>
  implements ICrudService<GeneralSettings, CreateGeneralSettingsDto, UpdateGeneralSettingsDto>
{
  constructor(
    @InjectRepository(GeneralSettings)
    repository: Repository<GeneralSettings>,
    protected readonly apiFeaturesService: APIFeaturesService,
  ) {
    super(repository, apiFeaturesService);
  }

  // Override findAll to return data without pagination
  public async findAll(filterData: any) {
    return this.findFront({
      query: {
        ...filterData,
        isPagination: "false",
      },
    });
  }

  // Get Google OAuth settings
  public async getGoogleOAuthSettings() {
    const settings = await this.findAll({});
    if (settings && settings.length > 0) {
      const googleSettings = settings[0];
      return {
        client_id_google: googleSettings.client_id_google,
        client_secret_google: googleSettings.client_secret_google,
        client_callback_url_google: googleSettings.client_callback_url_google,
      };
    }
    return null;
  }

  // Get Facebook OAuth settings
  public async getFacebookOAuthSettings() {
    const settings = await this.findAll({});
    if (settings && settings.length > 0) {
      const facebookSettings = settings[0];
      return {
        client_id_facebook: facebookSettings.client_id_facebook,
        client_secret_facebook: facebookSettings.client_secret_facebook,
        client_callback_url_facebook: facebookSettings.client_callback_url_facebook,
      };
    }
    return null;
  }
}
