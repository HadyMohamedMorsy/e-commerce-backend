import { Body, Controller, Delete, HttpCode, Post, Req } from "@nestjs/common";
import { ShipmentDto } from "./dtos/create.dto";
import { PatchShipmentDto } from "./dtos/patch.dto";
import { ShipmentService } from "./shipment.service";

@Controller("shipment")
export class ShipmentController {
  constructor(private readonly service: ShipmentService) {}

  @Post("/index")
  @HttpCode(200)
  public index(@Body() filter: any) {
    return this.service.findAll(filter);
  }

  @Post("/store")
  public create(@Body() create: ShipmentDto, @Req() req: Request) {
    return this.service.create({
      type: create.type,
      kgPrice: create.kgPrice,
      shipmentPrice: create.shipmentPrice,
      location: req["location"],
      createdBy: req["createdBy"],
    } as ShipmentDto);
  }

  @Post("/update")
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
  public delete(@Body() id: number) {
    return this.service.delete(id);
  }
}
