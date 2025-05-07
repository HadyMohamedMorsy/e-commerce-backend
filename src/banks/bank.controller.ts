import { Body, Controller, Delete, HttpCode, Patch, Post, Put, Req } from "@nestjs/common";
import { Roles } from "src/shared/decorators/roles.decorator";
import { BanksService } from "./bank.service";
import { BankDto } from "./dtos/create.dto";
import { PatchBankDto } from "./dtos/patch.dto";

@Controller("bank")
export class BankController {
  constructor(private readonly service: BanksService) {}

  @Post("/index")
  @Roles("CEO", "TECH_SUPPORT", "STORE_MANAGER", "SUPER_ADMIN", "CONTENT_MANAGER", "SYSTEM_ADMIN")
  @HttpCode(200)
  public index(@Body() filter: any) {
    return this.service.findAll(filter);
  }

  @Post("/store")
  @Roles("CEO", "TECH_SUPPORT", "STORE_MANAGER", "SUPER_ADMIN", "CONTENT_MANAGER", "SYSTEM_ADMIN")
  public create(@Body() create: BankDto, @Req() req: Request) {
    return this.service.create({
      accountName: create.accountName,
      accountNumber: create.accountNumber,
      branchName: create.branchName,
      bankName: create.bankName,
      featuredImage: create.featuredImage,
      iban: create.iban,
      swiftCode: create.swiftCode,
      isActive: create.isActive,
      country: req["country"],
      region: req["region"],
      city: req["city"],
      area: req["area"],
      createdBy: req["createdBy"],
    } as BankDto);
  }

  @Put("/update")
  @Roles("CEO", "TECH_SUPPORT", "STORE_MANAGER", "SUPER_ADMIN", "CONTENT_MANAGER", "SYSTEM_ADMIN")
  public async update(@Body() update: PatchBankDto, @Req() req: Request) {
    return await this.service.update({
      id: update.id,
      accountName: update.accountName,
      accountNumber: update.accountNumber,
      branchName: update.branchName,
      bankName: update.bankName,
      featuredImage: update.featuredImage,
      iban: update.iban,
      swiftCode: update.swiftCode,
      isActive: update.isActive,
      country: req["country"],
      region: req["region"],
      city: req["city"],
      area: req["area"],
      createdBy: req["createdBy"],
    });
  }

  @Patch("/change-active-status")
  @Roles("CEO", "TECH_SUPPORT", "STORE_MANAGER", "SUPER_ADMIN", "CONTENT_MANAGER", "SYSTEM_ADMIN")
  public async changeActiveStatus(@Body() data: { id: number; isActive: boolean }) {
    return await this.service.update({
      id: data.id,
      isActive: data.isActive,
    });
  }

  @Delete("/delete")
  @Roles("CEO", "TECH_SUPPORT", "STORE_MANAGER", "SUPER_ADMIN", "CONTENT_MANAGER", "SYSTEM_ADMIN")
  public delete(@Body() id: number) {
    return this.service.delete(id);
  }
}
