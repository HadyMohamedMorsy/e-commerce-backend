import { Body, Controller, Delete, Get, HttpCode, Param, Post, Req } from "@nestjs/common";
import { ProductDto } from "./dtos/create.dto";
import { PatchProductDto } from "./dtos/patch.dto";
import { ProductService } from "./products.service";

@Controller("product")
export class ProductController {
  constructor(private readonly service: ProductService) {}

  @Post("/index")
  @HttpCode(200)
  public index(@Body() filter: any) {
    return this.service.findAll(filter);
  }

  @Get("/:id")
  public async getById(@Param("id") id: number) {
    return this.service.findOne(id);
  }

  @Post("/store")
  public create(@Body() createDto: ProductDto, @Req() req: Request) {
    return this.service.create({
      name: createDto.name,
      description: createDto.description,
      summary: createDto.summary,
      cover: createDto.cover,
      categories: req["categories"],
      createdBy: req["createdBy"],
    } as ProductDto);
  }

  @Post("/update")
  public async update(@Body() update: PatchProductDto, @Req() req: Request) {
    return await this.service.update({
      id: update.id,
      name: update.name,
      description: update.description,
      summary: update.summary,
      cover: update.cover,
      categories: req["categories"],
      createdBy: req["createdBy"],
    });
  }

  @Delete("/delete")
  public delete(@Body() id: number) {
    return this.service.delete(id);
  }
}
