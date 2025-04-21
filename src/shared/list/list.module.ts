// list.module.ts
import { Module } from "@nestjs/common";
import { ListController } from "./list.controller";
import { ListService } from "./list.service";

@Module({
  providers: [ListService],
  controllers: [ListController],
  exports: [ListService],
})
export class ListModule {}
