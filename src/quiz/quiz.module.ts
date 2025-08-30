import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { FilterDateModule } from "src/shared/filters/filter-date.module";
import { QuizController } from "./quiz.controller";
import { Quiz } from "./quiz.entity";
import { QuizService } from "./quiz.service";

@Module({
  imports: [FilterDateModule, TypeOrmModule.forFeature([Quiz])],
  controllers: [QuizController],
  providers: [QuizService],
  exports: [QuizService],
})
export class QuizModule {}
