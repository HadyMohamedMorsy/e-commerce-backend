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
  public create(@Body() create: ContactDto) {
    return this.service.create({
      name: create.name,
      email: create.email,
      phone: create.phone,
      subject: create.subject,
      message: create.message,
    });
  }

  @Post("/update")
  public async update(@Body() update: PatchContactDto) {
    return await this.service.update({
      id: update.id,
      name: update.name,
      email: update.email,
      phone: update.phone,
      subject: update.subject,
      message: update.message,
    });
  }

  @Delete("/delete")
  public delete(@Body() id: number) {
    return this.service.delete(id);
  }
}
