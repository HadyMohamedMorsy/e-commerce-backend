import { Body, Controller, Delete, HttpCode, Post } from "@nestjs/common";
import { CartService } from "./carts.service";
import { CartDto } from "./dtos/create.dto";
import { PatchCartDto } from "./dtos/patch.dto";

@Controller("cart")
export class CartController {
  constructor(private readonly service: CartService) {}

  @Post("/index")
  @HttpCode(200)
  public index(@Body() filter: any) {
    return this.service.findAll(filter);
  }

  @Post("/store")
  public create(@Body() createDto: CartDto) {
    return this.service.create(createDto);
  }

  @Post("/update")
  public async update(@Body() update: PatchCartDto) {
    return await this.service.update(update);
  }

  @Delete("/delete")
  public delete(@Body() id: number) {
    return this.service.delete(id);
  }
}
