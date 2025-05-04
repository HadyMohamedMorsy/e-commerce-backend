import { Body, Controller, Delete, HttpCode, Post, Req } from "@nestjs/common";
import { Roles } from "src/shared/decorators/roles.decorator";
import { TaxDto } from "./dtos/create.dto";
import { PatchTaxDto } from "./dtos/patch.dto";
import { TaxService } from "./tax.service";

@Controller("tax")
export class TaxController {
  constructor(private readonly service: TaxService) {}

  @Post("/index")
  @Roles(
    "CEO",
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
  @Roles("CEO", "TECH_SUPPORT", "STORE_MANAGER", "SUPER_ADMIN", "CONTENT_MANAGER", "SYSTEM_ADMIN")
  public create(@Body() createDto: TaxDto, @Req() req: Request) {
    return this.service.create({
      name: createDto.name,
      rate: createDto.rate,
      location: req["location"],
      createdBy: req["createdBy"],
    } as TaxDto);
  }

  @Post("/update")
  @Roles("CEO", "TECH_SUPPORT", "STORE_MANAGER", "SUPER_ADMIN", "CONTENT_MANAGER", "SYSTEM_ADMIN")
  public async update(@Body() update: PatchTaxDto, @Req() req: Request) {
    return await this.service.update({
      id: update.id,
      name: update.name,
      rate: update.rate,
      location: req["location"],
      createdBy: req["createdBy"],
    });
  }

  @Delete("/delete")
  @Roles("STORE_MANAGER", "SUPER_ADMIN", "CONTENT_MANAGER", "CEO", "SYSTEM_ADMIN")
  public delete(@Body() id: number) {
    return this.service.delete(id);
  }
}
