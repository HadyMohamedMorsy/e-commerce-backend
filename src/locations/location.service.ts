import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { BaseCrudService } from "src/shared/base/base-crud";
import { APIFeaturesService } from "src/shared/filters/filter.service";
import { ICrudService } from "src/shared/interfaces/crud-service.interface";
import { Repository, SelectQueryBuilder } from "typeorm";
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

  override queryRelation(queryBuilder?: SelectQueryBuilder<any>, filteredRecord?: any) {
    const parentId = filteredRecord?.parentId;
    super.queryRelation(queryBuilder, filteredRecord);

    if (parentId) {
      queryBuilder.leftJoin("e.parent", "parent").andWhere("parent.id = :parentId", {
        parentId: filteredRecord.parentId,
      });
    } else {
      queryBuilder.where("e.parent IS NULL");
    }
  }

  async getLocationsForSelect(parentId?: number) {
    const queryBuilder = this.repository.createQueryBuilder("location");

    if (parentId) {
      queryBuilder
        .leftJoin("location.parent", "parent")
        .andWhere("parent.id = :parentId", { parentId });
    } else {
      queryBuilder.where("location.parent IS NULL");
    }

    const locations = await queryBuilder.getMany();
    return locations.map(({ id, name }) => ({ label: name, value: id }));
  }
}
