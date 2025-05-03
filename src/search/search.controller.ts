import { Body, Controller, Post } from "@nestjs/common";
import { SearchDto } from "./dto/search.dto";
import { SearchService } from "./search.service";

@Controller("search")
export class SearchController {
  constructor(private readonly searchService: SearchService) {}

  @Post("list")
  async searchList(@Body() searchDto: SearchDto): Promise<any> {
    return this.searchService.search(searchDto.type, searchDto.query);
  }
}
