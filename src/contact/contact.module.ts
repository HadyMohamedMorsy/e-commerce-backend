import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { FilterDateModule } from "src/shared/filters/filter-date.module";
import { ContactController } from "./contact.controller";
import { Contact } from "./contact.entity";
import { ContactsService } from "./contact.service";

@Module({
  imports: [FilterDateModule, TypeOrmModule.forFeature([Contact])],
  controllers: [ContactController],
  providers: [ContactsService],
  exports: [ContactsService],
})
export class ContactModule {}
