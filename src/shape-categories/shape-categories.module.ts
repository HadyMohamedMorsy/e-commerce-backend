import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ShapeCategoryController } from "./shape-categories.controller";
import { ShapeCategory } from "./shape-categories.entity";
import { ShapeCategoryService } from "./shape-categories.service";

@Module({
  imports: [TypeOrmModule.forFeature([ShapeCategory])],
  controllers: [ShapeCategoryController],
  providers: [ShapeCategoryService],
  exports: [ShapeCategoryService],
})
export class ShapeCategoryModule {}
