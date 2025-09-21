import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { FilterDateModule } from "src/shared/filters/filter-date.module";
import { EmailModule } from "src/shared/services/email.module";
import { SubscriptionController } from "./subscription.controller";
import { Sub } from "./subscription.entity";
import { SubService } from "./subscription.service";
@Module({
  imports: [FilterDateModule, TypeOrmModule.forFeature([Sub]), EmailModule],
  controllers: [SubscriptionController],
  providers: [SubService],
  exports: [SubService],
})
export class SubscriptionModule {}
