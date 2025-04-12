import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { FilterDateModule } from "src/shared/filters/filter-date.module";
import { AddressController } from "./address.controller";
import { Address } from "./address.entity";
import { AddressesService } from "./address.service";
@Module({
  imports: [FilterDateModule, TypeOrmModule.forFeature([Address])],
  controllers: [AddressController],
  providers: [AddressesService],
  exports: [AddressesService],
})
export class AddressModule {}
