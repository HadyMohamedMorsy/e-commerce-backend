import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { FilterDateModule } from "src/shared/filters/filter-date.module";
import { FaqController } from "./faq.controller";
import { Faq } from "./faq.entity";
import { FaqsService } from "./faq.service";

@Module({
  imports: [FilterDateModule, TypeOrmModule.forFeature([Faq])],
  controllers: [FaqController],
  providers: [FaqsService],
  exports: [FaqsService],
})
export class FaqModule {}
