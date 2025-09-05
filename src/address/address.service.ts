import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { BaseService } from "src/shared/base/base";
import { APIFeaturesService } from "src/shared/filters/filter.service";
import { ICrudService } from "src/shared/interfaces/crud-service.interface";
import { ShipmentService } from "src/shipments/shipment.service";
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
    private shipmentService: ShipmentService,
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

  async getFinalShipmentByAddressId(addressId: number): Promise<any> {
    // First get the address with location information
    const address = await this.findOne(
      addressId,
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

    // Try to find shipment by country (least specific)
    if (address.country?.id) {
      const countryShipment = await this.shipmentService.getFinalShipmentByLocation(
        address.country.id,
      );
      if (countryShipment) {
        return {
          address,
          shipment: countryShipment,
          locationType: "country",
          locationName: address.country.name,
        };
      }
    }

    // Try to find shipment by region
    if (address.region?.id) {
      const regionShipment = await this.shipmentService.getFinalShipmentByLocation(
        address.region.id,
      );
      if (regionShipment) {
        return {
          address,
          shipment: regionShipment,
          locationType: "region",
          locationName: address.region.name,
        };
      }
    }

    // Try to find shipment by city
    if (address.city?.id) {
      const cityShipment = await this.shipmentService.getFinalShipmentByLocation(address.city.id);
      if (cityShipment) {
        return {
          address,
          shipment: cityShipment,
          locationType: "city",
          locationName: address.city.name,
        };
      }
    }

    // Try to find shipment by area first (most specific)
    if (address.area?.id) {
      const areaShipment = await this.shipmentService.getFinalShipmentByLocation(address.area.id);
      if (areaShipment) {
        return {
          address,
          shipment: areaShipment,
          locationType: "area",
          locationName: address.area.name,
        };
      }
    }

    // No shipment found
    return {
      address,
      shipment: null,
      locationType: null,
      locationName: null,
      message: "No shipment available for this address location",
    };
  }
}
