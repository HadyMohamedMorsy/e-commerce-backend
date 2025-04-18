import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { FilterDateModule } from "src/shared/filters/filter-date.module";
import { BlogController } from "./blog.controller";
import { Blog } from "./blog.entity";
import { BlogsService } from "./blog.service";

@Module({
  imports: [FilterDateModule, TypeOrmModule.forFeature([Blog])],
  controllers: [BlogController],
  providers: [BlogsService],
  exports: [BlogsService],
})
export class BlogModule {}
