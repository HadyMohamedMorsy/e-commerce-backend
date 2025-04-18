import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { FilterDateModule } from "src/shared/filters/filter-date.module";
import { ShipmentController } from "./shipment.controller";
import { Shipment } from "./shipment.entity";
import { ShipmentService } from "./shipment.service";

@Module({
  imports: [FilterDateModule, TypeOrmModule.forFeature([Shipment])],
  controllers: [ShipmentController],
  providers: [ShipmentService],
  exports: [ShipmentService],
})
export class ShipmentModule {}
