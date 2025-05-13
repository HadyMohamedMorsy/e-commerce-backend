import { Body, Controller, Post, Put, Req } from "@nestjs/common";
import { BaseController } from "src/shared/base/base.controller";
import { Roles } from "src/shared/decorators/roles.decorator";
import { RelationOptions, SelectOptions } from "src/shared/interfaces/query.interface";
import { ShipmentDto } from "./dtos/create.dto";
import { PatchShipmentDto } from "./dtos/patch.dto";
import { Shipment } from "./shipment.entity";
import { ShipmentService } from "./shipment.service";

@Controller("shipment")
export class ShipmentController
  extends BaseController<Shipment, ShipmentDto, PatchShipmentDto>
  implements SelectOptions, RelationOptions
{
  constructor(protected readonly service: ShipmentService) {
    super(service);
  }

  public selectOptions(): Record<string, boolean> {
    return {
      id: true,
      created_at: true,
      updated_at: true,
      type: true,
      shipmentPrice: true,
    };
  }

  public getRelationOptions(): Record<string, any> {
    return {
      location: {
        id: true,
        name: true,
      },
      createdBy: {
        id: true,
        firstName: true,
        lastName: true,
      },
    };
  }

  @Post("/store")
  @Roles("CEO", "TECH_SUPPORT", "STORE_MANAGER", "SUPER_ADMIN", "CONTENT_MANAGER", "SYSTEM_ADMIN")
  public create(@Body() create: ShipmentDto, @Req() req: Request) {
    return this.service.create({
      type: create.type,
      shipmentPrice: create.shipmentPrice,
      location: req["location"],
      createdBy: req["createdBy"],
    } as ShipmentDto);
  }

  @Put("/update")
  @Roles("CEO", "TECH_SUPPORT", "STORE_MANAGER", "SUPER_ADMIN", "CONTENT_MANAGER", "SYSTEM_ADMIN")
  public async update(@Body() update: PatchShipmentDto, @Req() req: Request) {
    return await this.service.update({
      id: update.id,
      type: update.type,
      shipmentPrice: update.shipmentPrice,
      location: req["location"],
      createdBy: req["createdBy"],
    });
  }
}
