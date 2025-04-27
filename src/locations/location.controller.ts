import { Body, Controller, Delete, Get, HttpCode, Post, Query, Req } from "@nestjs/common";
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
  public create(@Body() create: LocationDto, @Req() req: Request) {
    return this.service.create({
      name: create.name,
      parent: req["parent"],
      createdBy: req["createdBy"],
    });
  }

  @Post("/update")
  public async update(@Body() update: PatchLocationDto, @Req() req: Request) {
    return await this.service.update({
      id: update.id,
      name: update.name,
      parent: req["parent"],
      createdBy: req["createdBy"],
    });
  }

  @Delete("/delete")
  public delete(@Body() id: number) {
    return this.service.delete(id);
  }

  @Get("select-options")
  async getLocationOptions(@Query("parentId") parentId?: string) {
    const parsedParentId = parentId === "null" ? null : parentId ? parseInt(parentId) : undefined;

    return this.service.getLocationsForSelect(parsedParentId);
  }
}
