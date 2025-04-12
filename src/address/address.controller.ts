import { Body, Controller, Delete, HttpCode, Post } from "@nestjs/common";
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
  public create(@Body() createDto: AddressDto) {
    return this.service.create(createDto);
  }

  @Post("/update")
  public async update(@Body() update: PatchAddressDto) {
    return await this.service.update(update);
  }

  @Delete("/delete")
  public delete(@Body() id: number) {
    return this.service.delete(id);
  }
}
