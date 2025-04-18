import { Body, Controller, Delete, HttpCode, Post } from "@nestjs/common";
import { ContactsService } from "./contact.service";
import { ContactDto } from "./dtos/create.dto";
import { PatchContactDto } from "./dtos/patch.dto";

@Controller("contact")
export class ContactController {
  constructor(private readonly service: ContactsService) {}

  @Post("/index")
  @HttpCode(200)
  public index(@Body() filter: any) {
    return this.service.findAll(filter);
  }

  @Post("/store")
  public create(@Body() createDto: ContactDto) {
    return this.service.create(createDto);
  }

  @Post("/update")
  public async update(@Body() update: PatchContactDto) {
    return await this.service.update(update);
  }

  @Delete("/delete")
  public delete(@Body() id: number) {
    return this.service.delete(id);
  }
}
