import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { BaseCrudService } from "src/shared/base/base-crud";
import { APIFeaturesService } from "src/shared/filters/filter.service";
import { ICrudService } from "src/shared/interfaces/crud-service.interface";
import { Repository } from "typeorm";
import { LocationDto } from "./dtos/create.dto";
import { PatchLocationDto } from "./dtos/patch.dto";
import { Location } from "./location.entity";

@Injectable()
export class LocationService
  extends BaseCrudService<Location, LocationDto, PatchLocationDto>
  implements ICrudService<Location, LocationDto, PatchLocationDto>
{
  constructor(
    apiFeaturesService: APIFeaturesService,
    @InjectRepository(Location)
    repository: Repository<Location>,
  ) {
    super(repository, apiFeaturesService);
  }
}
