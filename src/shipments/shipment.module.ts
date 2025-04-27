import { MiddlewareConsumer, Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { LocationModule } from "src/locations/location.module";
import { FilterDateModule } from "src/shared/filters/filter-date.module";
import { ShipmentLocationMiddleware } from "./middleware/shipments.middleware";
import { ShipmentController } from "./shipment.controller";
import { Shipment } from "./shipment.entity";
import { ShipmentService } from "./shipment.service";

@Module({
  imports: [FilterDateModule, LocationModule, TypeOrmModule.forFeature([Shipment])],
  controllers: [ShipmentController],
  providers: [ShipmentService],
  exports: [ShipmentService],
})
export class ShipmentModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(ShipmentLocationMiddleware).forRoutes("shipment/store", "shipment/update");
  }
}
