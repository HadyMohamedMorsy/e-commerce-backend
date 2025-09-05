import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { FilterDateModule } from "src/shared/filters/filter-date.module";
import { Answer } from "../answers/answer.entity";
import { Shape } from "../shapes/shapes.entity";
import { BookController } from "./book.controller";
import { Book } from "./book.entity";
import { BookService } from "./book.service";

@Module({
  imports: [FilterDateModule, TypeOrmModule.forFeature([Book, Answer, Shape])],
  controllers: [BookController],
  providers: [BookService],
  exports: [BookService],
})
export class BookModule {}
