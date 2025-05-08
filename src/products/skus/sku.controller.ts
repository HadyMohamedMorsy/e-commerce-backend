import { Body, Controller, Delete, HttpCode, Post, Put, Req } from "@nestjs/common";
import { Roles } from "src/shared/decorators/roles.decorator";
import { SkuDto } from "./dtos/create.dto";
import { PatchSkuDto } from "./dtos/patch.dto";
import { SkuService } from "./sku.service";

@Controller("product-sku")
export class SkuController {
  constructor(private readonly service: SkuService) {}

  @Post("/index")
  @HttpCode(200)
  @Roles("CEO", "TECH_SUPPORT", "STORE_MANAGER", "SUPER_ADMIN", "CONTENT_MANAGER", "SYSTEM_ADMIN")
  public index(@Body() filter: any) {
    return this.service.findAll(filter);
  }

  @Post("/store")
  @Roles("CEO", "TECH_SUPPORT", "STORE_MANAGER", "SUPER_ADMIN", "CONTENT_MANAGER", "SYSTEM_ADMIN")
  public create(@Body() createDto: SkuDto, @Req() req: Request) {
    const skuData = {
      sku: createDto.sku,
      price: +createDto.price,
      quantity: +createDto.quantity,
      discount: createDto.discount ? +createDto.discount : null,
      discountType: createDto.discountType,
      product: req["product"],
    };
    return this.service.create(skuData);
  }

  @Put("/update")
  @Roles("CEO", "TECH_SUPPORT", "STORE_MANAGER", "SUPER_ADMIN", "CONTENT_MANAGER", "SYSTEM_ADMIN")
  public async update(@Body() update: PatchSkuDto, @Req() req: Request) {
    return await this.service.update({
      id: update.id,
      sku: update.sku,
      price: update.price,
      quantity: update.quantity,
      discount: update.discount,
      discountType: update.discountType,
      product: req["product"],
    });
  }

  @Delete("/delete")
  @Roles("CEO", "TECH_SUPPORT", "STORE_MANAGER", "SUPER_ADMIN", "CONTENT_MANAGER", "SYSTEM_ADMIN")
  public delete(@Body() id: number) {
    return this.service.delete(id);
  }
}
