import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { FilterDateModule } from "src/shared/filters/filter-date.module";
import { OrderCustomController } from "./order-custom.controller";
import { OrderCustom } from "./order-custom.entity";
import { OrderCustomService } from "./order-custom.service";

@Module({
  imports: [FilterDateModule, TypeOrmModule.forFeature([OrderCustom])],
  controllers: [OrderCustomController],
  providers: [OrderCustomService],
  exports: [OrderCustomService],
})
export class OrderCustomModule {}
