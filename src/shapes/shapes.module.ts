import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ShapesController } from "./shapes.controller";
import { Shape } from "./shapes.entity";
import { ShapesService } from "./shapes.service";

@Module({
  imports: [TypeOrmModule.forFeature([Shape])],
  controllers: [ShapesController],
  providers: [ShapesService],
  exports: [ShapesService],
})
export class ShapesModule {}
