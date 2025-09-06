import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { BookModule } from "src/books/book.module";
import { Quiz } from "src/quiz/quiz.entity";
import { FilterDateModule } from "src/shared/filters/filter-date.module";
import { AnswerController } from "./answer.controller";
import { Answer } from "./answer.entity";
import { AnswerService } from "./answer.service";
import { AnswerValidationMiddleware } from "./middleware/answer-validation.middleware";

@Module({
  imports: [FilterDateModule, TypeOrmModule.forFeature([Answer, Quiz]), BookModule],
  controllers: [AnswerController],
  providers: [AnswerService, AnswerValidationMiddleware],
  exports: [AnswerService],
})
export class AnswerModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AnswerValidationMiddleware).forRoutes("answers/store", "answers/update");
  }
}
