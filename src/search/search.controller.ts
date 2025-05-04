import { Body, Controller, Post } from "@nestjs/common";
import { Roles } from "src/shared/decorators/roles.decorator";
import { SearchDto } from "./dto/search.dto";
import { SearchService } from "./search.service";

@Controller("search")
export class SearchController {
  constructor(private readonly searchService: SearchService) {}

  @Post("list")
  @Roles(
    "CEO",
    "TECH_SUPPORT",
    "STORE_MANAGER",
    "SUPER_ADMIN",
    "INVENTORY_MANAGER",
    "CONTENT_MANAGER",
    "SYSTEM_ADMIN",
  )
  async searchList(@Body() searchDto: SearchDto): Promise<any> {
    return this.searchService.search(searchDto.type, searchDto.query);
  }
}
