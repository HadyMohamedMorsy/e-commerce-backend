import { Body, Controller, Delete, HttpCode, Post, Req } from "@nestjs/common";
import { SkuDto } from "./dtos/create.dto";
import { PatchSkuDto } from "./dtos/patch.dto";
import { SkuService } from "./sku.service";

@Controller("sku")
export class SkuController {
  constructor(private readonly service: SkuService) {}

  @Post("/index")
  @HttpCode(200)
  public index(@Body() filter: any) {
    return this.service.findAll(filter);
  }

  @Post("/store")
  public create(@Body() createDto: SkuDto, @Req() req: Request) {
    return this.service.create({
      product: req["product"],
      sku: createDto.sku,
      price: createDto.price,
      quantity: createDto.quantity,
    } as SkuDto);
  }

  @Post("/update")
  public async update(@Body() update: PatchSkuDto, @Req() req: Request) {
    return await this.service.update({
      id: update.id,
      product: req["product"],
      sku: update.sku,
      price: update.price,
      quantity: update.quantity,
    });
  }

  @Delete("/delete")
  public delete(@Body() id: number) {
    return this.service.delete(id);
  }
}
