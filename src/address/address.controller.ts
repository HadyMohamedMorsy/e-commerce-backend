import { Body, Controller, Delete, HttpCode, Post, Req } from "@nestjs/common";
import { AddressesService } from "./address.service";
import { AddressDto } from "./dtos/create.dto";
import { PatchAddressDto } from "./dtos/patch.dto";

@Controller("address")
export class AddressController {
  constructor(private readonly service: AddressesService) {}

  @Post("/index")
  @HttpCode(200)
  public index(@Body() filter: any) {
    return this.service.findAll(filter);
  }

  @Post("/store")
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
    } as AddressDto);
  }

  @Post("/update")
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
    });
  }

  @Delete("/delete")
  public delete(@Body() id: number) {
    return this.service.delete(id);
  }
}
