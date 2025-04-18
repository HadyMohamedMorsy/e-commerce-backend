import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { BaseCrudService } from "src/shared/base/base-crud";
import { APIFeaturesService } from "src/shared/filters/filter.service";
import { ICrudService } from "src/shared/interfaces/crud-service.interface";
import { Repository } from "typeorm";
import { Contact } from "./contact.entity";
import { CreateContactDto } from "./dtos/create-contact.dto";
import { UpdateContactDto } from "./dtos/update-contact.dto";

@Injectable()
export class ContactsService
  extends BaseCrudService<Contact, CreateContactDto, UpdateContactDto>
  implements ICrudService<Contact, CreateContactDto, UpdateContactDto>
{
  constructor(
    apiFeaturesService: APIFeaturesService,
    @InjectRepository(Contact)
    repository: Repository<Contact>,
  ) {
    super(repository, apiFeaturesService);
  }
}
