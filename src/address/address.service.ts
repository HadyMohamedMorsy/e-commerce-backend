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

  async setDefaultAddress(addressId: number, userId: number): Promise<Address> {
    const userAddresses = await this.repository.find({
      where: { user: { id: userId } },
    });

    for (const address of userAddresses) {
      await this.update(
        { id: address.id, isDefault: false },
        {
          id: true,
          title: true,
          addressLine1: true,
          addressLine2: true,
          postalCode: true,
          landmark: true,
          isDefault: true,
          phoneNumber: true,
        },
        {
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
        },
      );
    }

    return this.update(
      { id: addressId, isDefault: true },
      {
        id: true,
        title: true,
        addressLine1: true,
        addressLine2: true,
        postalCode: true,
        landmark: true,
        isDefault: true,
        phoneNumber: true,
      },
      {
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
      },
    );
  }
}
