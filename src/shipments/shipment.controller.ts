import { Body, Controller, Delete, HttpCode, Post } from "@nestjs/common";
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
  public create(@Body() createDto: ShipmentDto) {
    return this.service.create(createDto);
  }

  @Post("/update")
  public async update(@Body() update: PatchShipmentDto) {
    return await this.service.update(update);
  }

  @Delete("/delete")
  public delete(@Body() id: number) {
    return this.service.delete(id);
  }
}
