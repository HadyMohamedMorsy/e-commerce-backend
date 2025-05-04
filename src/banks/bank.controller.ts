import { Body, Controller, Delete, HttpCode, Post, Req } from "@nestjs/common";
import { Roles } from "src/shared/decorators/roles.decorator";
import { BanksService } from "./bank.service";
import { BankDto } from "./dtos/create.dto";
import { PatchBankDto } from "./dtos/patch.dto";

@Controller("bank")
export class BankController {
  constructor(private readonly service: BanksService) {}

  @Post("/index")
  @Roles("CEO", "TECH_SUPPORT")
  @HttpCode(200)
  public index(@Body() filter: any) {
    return this.service.findAll(filter);
  }

  @Post("/store")
  @Roles("CEO", "TECH_SUPPORT")
  public create(@Body() create: BankDto, @Req() req: Request) {
    return this.service.create({
      accountName: create.accountName,
      accountNumber: create.accountNumber,
      branchName: create.branchName,
      bankName: create.bankName,
      featuredImage: create.featuredImage,
      iban: create.iban,
      swiftCode: create.swiftCode,
      country: req["country"],
      region: req["region"],
      city: req["city"],
      area: req["area"],
      createdBy: req["createdBy"],
    } as BankDto);
  }

  @Post("/update")
  @Roles("CEO", "TECH_SUPPORT")
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
      country: req["country"],
      region: req["region"],
      city: req["city"],
      area: req["area"],
      createdBy: req["createdBy"],
    });
  }

  @Delete("/delete")
  @Roles("CEO", "TECH_SUPPORT")
  public delete(@Body() id: number) {
    return this.service.delete(id);
  }
}
