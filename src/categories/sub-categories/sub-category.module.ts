import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { FilterDateModule } from "src/shared/filters/filter-date.module";
import { SubCategoryController } from "./sub-category.controller";
import { SubCategory } from "./sub-category.entity";
import { SubCategoryService } from "./sub-category.service";
@Module({
  imports: [FilterDateModule, TypeOrmModule.forFeature([SubCategory])],
  controllers: [SubCategoryController],
  providers: [SubCategoryService],
  exports: [SubCategoryService],
})
export class SubCategoryModule {}
