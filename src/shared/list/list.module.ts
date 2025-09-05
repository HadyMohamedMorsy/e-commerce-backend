// list.module.ts
import { Module } from "@nestjs/common";
import { BookModule } from "src/books/book.module";
import { CategoryModule } from "src/categories/category.module";
import { QuizModule } from "src/quiz/quiz.module";
import { ShapeCategoryModule } from "src/shape-categories/shape-categories.module";
import { ListController } from "./list.controller";
import { ListService } from "./list.service";

@Module({
  imports: [CategoryModule, ShapeCategoryModule, QuizModule, BookModule],
  providers: [ListService],
  controllers: [ListController],
  exports: [ListService],
})
export class ListModule {}
