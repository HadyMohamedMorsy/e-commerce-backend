import { Body, Controller, Delete, HttpCode, Post, Req } from "@nestjs/common";
import { Roles } from "src/shared/decorators/roles.decorator";
import { AddressesService } from "./address.service";
import { AddressDto } from "./dtos/create.dto";
import { PatchAddressDto } from "./dtos/patch.dto";

@Controller("address")
export class AddressController {
  constructor(private readonly service: AddressesService) {}

  @Post("/index")
  @Roles(
    "CEO",
    "TECH_SUPPORT",
    "CUSTOMER",
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
    return this.service.create({
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
    } as AddressDto);
  }

  @Post("/update")
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
    return await this.service.update({
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
    });
  }

  @Delete("/delete")
  @Roles("STORE_MANAGER", "CUSTOMER", "SUPER_ADMIN", "CONTENT_MANAGER", "CEO", "SYSTEM_ADMIN")
  public delete(@Body() id: number) {
    return this.service.delete(id);
  }
}
