import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { LocationModule } from "src/locations/location.module";
import { TaxController } from "./tax.controller";
import { Tax } from "./tax.entity";
import { TaxService } from "./tax.service";

@Module({
  imports: [LocationModule, TypeOrmModule.forFeature([Tax])],
  controllers: [TaxController],
  providers: [TaxService],
  exports: [TaxService],
})
export class TaxModule {}
