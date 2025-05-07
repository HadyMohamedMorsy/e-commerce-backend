import { Body, Controller, Delete, HttpCode, Post, Put, Req } from "@nestjs/common";
import { Roles } from "src/shared/decorators/roles.decorator";
import { ShipmentDto } from "./dtos/create.dto";
import { PatchShipmentDto } from "./dtos/patch.dto";
import { ShipmentService } from "./shipment.service";

@Controller("shipment")
export class ShipmentController {
  constructor(private readonly service: ShipmentService) {}

  @Post("/index")
  @Roles(
    "CEO",
    "TECH_SUPPORT",
    "STORE_MANAGER",
    "SUPER_ADMIN",
    "INVENTORY_MANAGER",
    "CONTENT_MANAGER",
    "SYSTEM_ADMIN",
  )
  @HttpCode(200)
  public index(@Body() filter: any) {
    return this.service.findAll(filter);
  }

  @Post("/store")
  @Roles("CEO", "TECH_SUPPORT", "STORE_MANAGER", "SUPER_ADMIN", "CONTENT_MANAGER", "SYSTEM_ADMIN")
  public create(@Body() create: ShipmentDto, @Req() req: Request) {
    return this.service.create({
      type: create.type,
      kgPrice: create.kgPrice,
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
      kgPrice: update.kgPrice,
      shipmentPrice: update.shipmentPrice,
      location: req["location"],
      createdBy: req["createdBy"],
    });
  }

  @Delete("/delete")
  @Roles("STORE_MANAGER", "SUPER_ADMIN", "CONTENT_MANAGER", "CEO", "SYSTEM_ADMIN")
  public delete(@Body() id: number) {
    return this.service.delete(id);
  }
}
