import { MiddlewareConsumer, Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { LocationModule } from "src/locations/location.module";
import { FilterDateModule } from "src/shared/filters/filter-date.module";
import { LocationResolutionMiddleware } from "src/shared/middleware/location-selected.middleware";
import { AddressController } from "./address.controller";
import { Address } from "./address.entity";
import { AddressesService } from "./address.service";
@Module({
  imports: [LocationModule, FilterDateModule, TypeOrmModule.forFeature([Address])],
  controllers: [AddressController],
  providers: [AddressesService],
  exports: [AddressesService],
})
export class AddressModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LocationResolutionMiddleware).forRoutes("address/store", "address/update");
  }
}
