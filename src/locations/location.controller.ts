import { Body, Controller, Get, Post, Put, Query, Req } from "@nestjs/common";
import { BaseController } from "src/shared/base/base.controller";
import { Roles } from "src/shared/decorators/roles.decorator";
import { RelationOptions, SelectOptions } from "src/shared/interfaces/query.interface";
import { LocationDto } from "./dtos/create.dto";
import { PatchLocationDto } from "./dtos/patch.dto";
import { Location } from "./location.entity";
import { LocationService } from "./location.service";

@Controller("location")
export class LocationController
  extends BaseController<Location, LocationDto, PatchLocationDto>
  implements SelectOptions, RelationOptions
{
  constructor(protected readonly service: LocationService) {
    super(service);
  }

  public selectOptions(): Record<string, boolean> {
    return {
      id: true,
      created_at: true,
      updated_at: true,
      name: true,
    };
  }

  public getRelationOptions(): Record<string, any> {
    return {
      createdBy: {
        id: true,
        firstName: true,
        lastName: true,
      },
      parent: {
        id: true,
        name: true,
      },
    };
  }

  @Post("/store")
  @Roles("CEO", "TECH_SUPPORT", "STORE_MANAGER", "SUPER_ADMIN", "CONTENT_MANAGER", "SYSTEM_ADMIN")
  public create(@Body() create: LocationDto, @Req() req: Request) {
    return this.service.create(
      {
        name: create.name,
        parent: req["parent"],
        createdBy: req["createdBy"],
      },
      this.selectOptions(),
      this.getRelationOptions(),
    );
  }

  @Put("/update")
  @Roles("CEO", "TECH_SUPPORT", "STORE_MANAGER", "SUPER_ADMIN", "CONTENT_MANAGER", "SYSTEM_ADMIN")
  public async update(@Body() update: PatchLocationDto, @Req() req: Request) {
    return await this.service.update(
      {
        id: update.id,
        name: update.name,
        parent: req["parent"],
        createdBy: req["createdBy"],
      },
      this.selectOptions(),
      this.getRelationOptions(),
    );
  }

  @Get("select-options")
  @Roles(
    "CEO",
    "TECH_SUPPORT",
    "STORE_MANAGER",
    "SUPER_ADMIN",
    "INVENTORY_MANAGER",
    "CONTENT_MANAGER",
    "SYSTEM_ADMIN",
  )
  async getLocationOptions(@Query("parentId") parentId?: string) {
    const parsedParentId = parentId === "null" ? null : parentId ? parseInt(parentId) : undefined;

    return this.service.getLocationsForSelect(parsedParentId);
  }
}
