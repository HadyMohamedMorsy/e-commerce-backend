import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { BaseService } from "src/shared/base/base";
import { APIFeaturesService } from "src/shared/filters/filter.service";
import { ICrudService } from "src/shared/interfaces/crud-service.interface";
import { Repository, SelectQueryBuilder } from "typeorm";
import { ShipmentDto } from "./dtos/create.dto";
import { PatchShipmentDto } from "./dtos/patch.dto";
import { Shipment } from "./shipment.entity";

@Injectable()
export class ShipmentService
  extends BaseService<Shipment, ShipmentDto, PatchShipmentDto>
  implements ICrudService<Shipment, ShipmentDto, PatchShipmentDto>
{
  constructor(
    apiFeaturesService: APIFeaturesService,
    @InjectRepository(Shipment)
    repository: Repository<Shipment>,
  ) {
    super(repository, apiFeaturesService);
  }

  override queryRelationIndex(queryBuilder?: SelectQueryBuilder<any>, filteredRecord?: any) {
    super.queryRelationIndex(queryBuilder, filteredRecord);
    queryBuilder.leftJoin("e.location", "location").addSelect(["location.id", "location.name"]);
  }

  async getFinalShipmentByLocation(locationId: number): Promise<Shipment | null> {
    const queryBuilder = this.repository.createQueryBuilder("shipment");

    queryBuilder
      .leftJoin("shipment.location", "location")
      .leftJoin("shipment.createdBy", "createdBy")
      .where("location.id = :locationId", { locationId })
      .select([
        "shipment.id",
        "shipment.type",
        "shipment.shipmentPrice",
        "shipment.created_at",
        "shipment.updated_at",
        "location.id",
        "location.name",
        "createdBy.id",
        "createdBy.firstName",
        "createdBy.lastName",
      ])
      .orderBy("shipment.shipmentPrice", "ASC")
      .limit(1);

    return await queryBuilder.getOne();
  }
}
