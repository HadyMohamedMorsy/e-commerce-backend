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
}
