import { MiddlewareConsumer, Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { FilterDateModule } from "src/shared/filters/filter-date.module";
import { LocationController } from "./location.controller";
import { Location } from "./location.entity";
import { LocationService } from "./location.service";
import { ResolveLocationParentMiddleware } from "./middleware/location.middleware";

@Module({
  imports: [FilterDateModule, TypeOrmModule.forFeature([Location])],
  controllers: [LocationController],
  providers: [LocationService],
  exports: [LocationService],
})
export class LocationModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(ResolveLocationParentMiddleware).forRoutes("location/store", "location/update");
  }
}
