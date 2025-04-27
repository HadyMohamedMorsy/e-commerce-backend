import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { BaseCrudService } from "src/shared/base/base-crud";
import { APIFeaturesService } from "src/shared/filters/filter.service";
import { ICrudService } from "src/shared/interfaces/crud-service.interface";
import { Repository, SelectQueryBuilder } from "typeorm";
import { ShipmentDto } from "./dtos/create.dto";
import { PatchShipmentDto } from "./dtos/patch.dto";
import { Shipment } from "./shipment.entity";

@Injectable()
export class ShipmentService
  extends BaseCrudService<Shipment, ShipmentDto, PatchShipmentDto>
  implements ICrudService<Shipment, ShipmentDto, PatchShipmentDto>
{
  constructor(
    apiFeaturesService: APIFeaturesService,
    @InjectRepository(Shipment)
    repository: Repository<Shipment>,
  ) {
    super(repository, apiFeaturesService);
  }

  override queryRelation(queryBuilder?: SelectQueryBuilder<any>, filteredRecord?: any) {
    super.queryRelation(queryBuilder, filteredRecord);
    queryBuilder.leftJoin("e.location", "location").addSelect(["location.id", "location.name"]);
  }
}
