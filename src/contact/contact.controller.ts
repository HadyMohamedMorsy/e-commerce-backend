import { Body, Controller, Delete, HttpCode, Post, Put } from "@nestjs/common";
import { Roles } from "src/shared/decorators/roles.decorator";
import { ContactsService } from "./contact.service";
import { ContactDto } from "./dtos/create.dto";
import { PatchContactDto } from "./dtos/patch.dto";

@Controller("contact")
export class ContactController {
  constructor(private readonly service: ContactsService) {}

  @Post("/index")
  @Roles(
    "CEO",
    "CUSTOMER",
    "TECH_SUPPORT",
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
  public create(@Body() create: ContactDto) {
    return this.service.create({
      name: create.name,
      email: create.email,
      phone: create.phone,
      subject: create.subject,
      message: create.message,
    });
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
  @Roles("STORE_MANAGER", "CUSTOMER", "SUPER_ADMIN", "CONTENT_MANAGER", "CEO", "SYSTEM_ADMIN")
  public delete(@Body() id: number) {
    return this.service.delete(id);
  }
}
