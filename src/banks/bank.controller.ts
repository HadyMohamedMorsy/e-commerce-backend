import { Body, Controller, Delete, HttpCode, Post } from "@nestjs/common";
import { BanksService } from "./bank.service";
import { BankDto } from "./dtos/create.dto";
import { PatchBankDto } from "./dtos/patch.dto";

@Controller("bank")
export class BankController {
  constructor(private readonly service: BanksService) {}

  @Post("/index")
  @HttpCode(200)
  public index(@Body() filter: any) {
    return this.service.findAll(filter);
  }

  @Post("/store")
  public create(@Body() createDto: BankDto) {
    return this.service.create(createDto);
  }

  @Post("/update")
  public async update(@Body() update: PatchBankDto) {
    return await this.service.update(update);
  }

  @Delete("/delete")
  public delete(@Body() id: number) {
    return this.service.delete(id);
  }
}
