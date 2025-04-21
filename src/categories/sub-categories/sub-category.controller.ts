import { Body, Controller, Delete, HttpCode, Post, Req } from "@nestjs/common";
import { SubCategoryDto } from "./dtos/create.dto";
import { PatchSubCategoryDto } from "./dtos/patch.dto";
import { SubCategoryService } from "./sub-category.service";

@Controller("sub-category")
export class SubCategoryController {
  constructor(private readonly service: SubCategoryService) {}

  @Post("/index")
  @HttpCode(200)
  public index(@Body() filter: any) {
    return this.service.findAll(filter);
  }

  @Post("/store")
  public create(@Body() createDto: SubCategoryDto, @Req() req: Request) {
    return this.service.create({
      ...createDto,
      createdBy: req["createdBy"],
    });
  }

  @Post("/update")
  public async update(@Body() update: PatchSubCategoryDto, @Req() req: Request) {
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
