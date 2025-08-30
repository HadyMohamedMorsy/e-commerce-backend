import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { FilterDateModule } from "src/shared/filters/filter-date.module";
import { AnswerController } from "./answer.controller";
import { Answer } from "./answer.entity";
import { AnswerService } from "./answer.service";

@Module({
  imports: [FilterDateModule, TypeOrmModule.forFeature([Answer])],
  controllers: [AnswerController],
  providers: [AnswerService],
  exports: [AnswerService],
})
export class AnswerModule {}
