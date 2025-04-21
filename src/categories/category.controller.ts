import { Body, Controller, Delete, HttpCode, Post, Req } from "@nestjs/common";
import { CategoryService } from "./category.service";
import { CategoryDto } from "./dtos/create.dto";
import { PatchCategoryDto } from "./dtos/patch.dto";

@Controller("category")
export class CategoryController {
  constructor(private readonly service: CategoryService) {}

  @Post("/index")
  @HttpCode(200)
  public index(@Body() filter: any) {
    return this.service.findAll(filter);
  }

  @Post("/store")
  public create(@Body() createDto: CategoryDto, @Req() req: Request) {
    return this.service.create({
      ...createDto,
      createdBy: req["createdBy"],
    });
  }

  @Post("/update")
  public async update(@Body() update: PatchCategoryDto, @Req() req: Request) {
    return await this.service.update({
      ...update,
      createdBy: req["createdBy"],
    });
  }

  @Delete("/delete")
  public delete(@Body() id: number) {
    return this.service.delete(id);
  }
}
