// list.controller.ts
import { Controller, Get, Param } from "@nestjs/common";
import { ListService } from "./list.service";

@Controller("lists")
export class ListController {
  constructor(private readonly listService: ListService) {}

  @Get("slug/:slug")
  getListsBySlug(@Param("slug") slug: string) {
    return this.listService.getListsBySlug(slug);
  }
}
