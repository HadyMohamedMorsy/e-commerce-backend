import { Body, Controller, Post, Put, Req } from "@nestjs/common";
import { BaseController } from "src/shared/base/base.controller";
import { Roles } from "src/shared/decorators/roles.decorator";
import { RelationOptions, SelectOptions } from "src/shared/interfaces/query.interface";
import { TaxDto } from "./dtos/create.dto";
import { PatchTaxDto } from "./dtos/patch.dto";
import { Taxes } from "./tax.entity";
import { TaxService } from "./tax.service";

@Controller("tax")
export class TaxController
  extends BaseController<Taxes, TaxDto, PatchTaxDto>
  implements SelectOptions, RelationOptions
{
  constructor(protected readonly service: TaxService) {
    super(service);
  }

  public selectOptions(): Record<string, boolean> {
    return {
      id: true,
      created_at: true,
      updated_at: true,
      name: true,
      rate: true,
    };
  }

  public getRelationOptions(): Record<string, any> {
    return {
      createdBy: {
        id: true,
        firstName: true,
        lastName: true,
      },
      country: {
        id: true,
        name: true,
      },
    };
  }

  @Post("/store")
  @Roles("CEO", "TECH_SUPPORT", "STORE_MANAGER", "SUPER_ADMIN", "CONTENT_MANAGER", "SYSTEM_ADMIN")
  public create(@Body() createDto: TaxDto, @Req() req: Request) {
    return this.service.create(
      {
        name: createDto.name,
        rate: createDto.rate,
        country: req["country"],
        createdBy: req["createdBy"],
      } as TaxDto,
      this.selectOptions(),
      this.getRelationOptions(),
    );
  }

  @Put("/update")
  @Roles("CEO", "TECH_SUPPORT", "STORE_MANAGER", "SUPER_ADMIN", "CONTENT_MANAGER", "SYSTEM_ADMIN")
  public async update(@Body() update: PatchTaxDto, @Req() req: Request) {
    return await this.service.update(
      {
        id: update.id,
        name: update.name,
        rate: update.rate,
        country: req["country"],
        createdBy: req["createdBy"],
      },
      this.selectOptions(),
      this.getRelationOptions(),
    );
  }
}
