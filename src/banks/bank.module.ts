import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { FilterDateModule } from "src/shared/filters/filter-date.module";
import { BankController } from "./bank.controller";
import { Bank } from "./bank.entity";
import { BanksService } from "./bank.service";

@Module({
  imports: [FilterDateModule, TypeOrmModule.forFeature([Bank])],
  controllers: [BankController],
  providers: [BanksService],
  exports: [BanksService],
})
export class BankModule {}
