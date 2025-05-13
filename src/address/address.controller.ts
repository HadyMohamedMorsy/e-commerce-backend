import { Body, Controller, Patch, Post, Put, Req } from "@nestjs/common";
import { BaseController } from "src/shared/base/base.controller";
import { Roles } from "src/shared/decorators/roles.decorator";
import { RelationOptions, SelectOptions } from "src/shared/interfaces/query.interface";
import { Address } from "./address.entity";
import { AddressesService } from "./address.service";
import { AddressDto } from "./dtos/create.dto";
import { PatchAddressDto } from "./dtos/patch.dto";

@Controller("address")
export class AddressController
  extends BaseController<Address, AddressDto, PatchAddressDto>
  implements SelectOptions, RelationOptions
{
  constructor(protected readonly service: AddressesService) {
    super(service);
  }
  selectOptions(): Record<string, boolean> {
    return {
      id: true,
      created_at: true,
      updated_at: true,
      title: true,
      addressLine1: true,
      addressLine2: true,
      postalCode: true,
      landmark: true,
    };
  }

  public getRelationOptions(): Record<string, any> {
    return {
      createdBy: {
        id: true,
        firstName: true,
        lastName: true,
      },
      country: {
        id: true,
        name: true,
      },
      region: {
        id: true,
        name: true,
      },
      city: {
        id: true,
        name: true,
      },
      area: {
        id: true,
        name: true,
      },
    };
  }

  @Patch("/change-default-status")
  @Roles("CEO", "TECH_SUPPORT", "STORE_MANAGER", "SUPER_ADMIN", "CONTENT_MANAGER", "SYSTEM_ADMIN")
  public async changeDefaultStatus(@Body() data: { id: number; isDefault: boolean }) {
    return await this.service.changeStatus(data.id, data.isDefault);
  }

  @Post("/store")
  @Roles(
    "CEO",
    "CUSTOMER",
    "TECH_SUPPORT",
    "STORE_MANAGER",
    "SUPER_ADMIN",
    "CONTENT_MANAGER",
    "SYSTEM_ADMIN",
  )
  public create(@Body() create: AddressDto, @Req() req: Request) {
    return this.service.create(
      {
        title: create.title,
        addressLine1: create.addressLine1,
        addressLine2: create.addressLine2,
        country: req["country"],
        region: req["region"],
        city: req["city"],
        area: req["area"],
        postalCode: create.postalCode,
        landmark: create.landmark,
        phoneNumber: create.phoneNumber,
        createdBy: req["createdBy"],
        user: req["createdBy"],
      } as AddressDto,
      this.selectOptions(),
      this.getRelationOptions(),
    );
  }

  @Put("/update")
  @Roles(
    "CEO",
    "CUSTOMER",
    "TECH_SUPPORT",
    "STORE_MANAGER",
    "SUPER_ADMIN",
    "CONTENT_MANAGER",
    "SYSTEM_ADMIN",
  )
  public async update(@Body() update: PatchAddressDto, @Req() req: Request) {
    return await this.service.update(
      {
        id: update.id,
        title: update.title,
        addressLine1: update.addressLine1,
        addressLine2: update.addressLine2,
        country: req["country"],
        region: req["region"],
        city: req["city"],
        area: req["area"],
        postalCode: update.postalCode,
        landmark: update.landmark,
        phoneNumber: update.phoneNumber,
        createdBy: req["createdBy"],
        user: req["createdBy"],
      },
      this.selectOptions(),
      this.getRelationOptions(),
    );
  }
}
