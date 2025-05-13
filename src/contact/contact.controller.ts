import { Body, Controller, Post, Put } from "@nestjs/common";
import { BaseController } from "src/shared/base/base.controller";
import { Roles } from "src/shared/decorators/roles.decorator";
import { RelationOptions, SelectOptions } from "src/shared/interfaces/query.interface";
import { Contact } from "./contact.entity";
import { ContactsService } from "./contact.service";
import { ContactDto } from "./dtos/create.dto";
import { PatchContactDto } from "./dtos/patch.dto";

@Controller("contact")
export class ContactController
  extends BaseController<Contact, ContactDto, PatchContactDto>
  implements SelectOptions, RelationOptions
{
  constructor(protected readonly service: ContactsService) {
    super(service);
  }

  public selectOptions(): Record<string, boolean> {
    return {
      id: true,
      created_at: true,
      updated_at: true,
      name: true,
      email: true,
      phone: true,
      subject: true,
      message: true,
    };
  }

  public getRelationOptions(): Record<string, any> {
    return {
      createdBy: {
        id: true,
        firstName: true,
        lastName: true,
      },
    };
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
    return this.service.create(
      {
        name: create.name,
        email: create.email,
        phone: create.phone,
        subject: create.subject,
        message: create.message,
      },
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
  public async update(@Body() update: PatchContactDto) {
    return await this.service.update(
      {
        id: update.id,
        name: update.name,
        email: update.email,
        phone: update.phone,
        subject: update.subject,
        message: update.message,
      },
      this.selectOptions(),
      this.getRelationOptions(),
    );
  }
}
