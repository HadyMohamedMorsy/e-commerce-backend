import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { BaseService } from "src/shared/base/base";
import { APIFeaturesService } from "src/shared/filters/filter.service";
import { ICrudService } from "src/shared/interfaces/crud-service.interface";
import { Repository } from "typeorm";
import { Address } from "./address.entity";
import { AddressDto } from "./dtos/create.dto";
import { PatchAddressDto } from "./dtos/patch.dto";
@Injectable()
export class AddressesService
  extends BaseService<Address, AddressDto, PatchAddressDto>
  implements ICrudService<Address, AddressDto, PatchAddressDto>
{
  constructor(
    apiFeaturesService: APIFeaturesService,
    @InjectRepository(Address)
    repository: Repository<Address>,
  ) {
    super(repository, apiFeaturesService);
  }
}
