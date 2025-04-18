import { Body, Controller, Delete, HttpCode, Post } from "@nestjs/common";
import { LocationDto } from "./dtos/create.dto";
import { PatchLocationDto } from "./dtos/patch.dto";
import { LocationService } from "./location.service";

@Controller("location")
export class LocationController {
  constructor(private readonly service: LocationService) {}

  @Post("/index")
  @HttpCode(200)
  public index(@Body() filter: any) {
    return this.service.findAll(filter);
  }

  @Post("/store")
  public create(@Body() createDto: LocationDto) {
    return this.service.create(createDto);
  }

  @Post("/update")
  public async update(@Body() update: PatchLocationDto) {
    return await this.service.update(update);
  }

  @Delete("/delete")
  public delete(@Body() id: number) {
    return this.service.delete(id);
  }
}
