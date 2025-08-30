import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { FilterDateModule } from "src/shared/filters/filter-date.module";
import { BookController } from "./book.controller";
import { Book } from "./book.entity";
import { BookService } from "./book.service";

@Module({
  imports: [FilterDateModule, TypeOrmModule.forFeature([Book])],
  controllers: [BookController],
  providers: [BookService],
  exports: [BookService],
})
export class BookModule {}
