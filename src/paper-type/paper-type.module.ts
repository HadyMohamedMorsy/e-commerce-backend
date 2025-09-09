import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { FilterDateModule } from "src/shared/filters/filter-date.module";
import { PaperTypeController } from "./paper-type.controller";
import { PaperType } from "./paper-type.entity";
import { PaperTypeService } from "./paper-type.service";

@Module({
  imports: [FilterDateModule, TypeOrmModule.forFeature([PaperType])],
  controllers: [PaperTypeController],
  providers: [PaperTypeService],
  exports: [PaperTypeService],
})
export class PaperTypeModule {}
