import { Body, Controller, Delete, HttpCode, Post, Put, Req } from "@nestjs/common";
import { Roles } from "src/shared/decorators/roles.decorator";
import { CartService } from "./carts.service";
import { CartDto } from "./dtos/create.dto";
import { PatchCartDto } from "./dtos/patch.dto";

@Controller("cart")
export class CartController {
  constructor(private readonly service: CartService) {}

  @Post("/index")
  @Roles(
    "CEO",
    "TECH_SUPPORT",
    "STORE_MANAGER",
    "SUPER_ADMIN",
    "INVENTORY_MANAGER",
    "CONTENT_MANAGER",
    "SYSTEM_ADMIN",
  )
  @HttpCode(200)
  public index(@Body() filter: any) {
    return this.service.findAll(filter);
  }

  @Post("/store")
  @Roles("CEO", "TECH_SUPPORT", "STORE_MANAGER", "SUPER_ADMIN", "CONTENT_MANAGER", "SYSTEM_ADMIN")
  public create(@Body() createDto: CartDto, @Req() req: Request) {
    return this.service.create({
      cartItems: createDto.cartItems,
      user: req["createdBy"],
      createdBy: req["createdBy"],
    });
  }

  @Put("/update")
  @Roles("CEO", "TECH_SUPPORT", "STORE_MANAGER", "SUPER_ADMIN", "CONTENT_MANAGER", "SYSTEM_ADMIN")
  public async update(@Body() update: PatchCartDto, @Req() req: Request) {
    return await this.service.update({
      id: update.id,
      cartItems: update.cartItems,
      user: req["createdBy"],
      createdBy: req["createdBy"],
    });
  }

  @Delete("/delete")
  @Roles("STORE_MANAGER", "SUPER_ADMIN", "CONTENT_MANAGER", "CEO", "SYSTEM_ADMIN")
  public delete(@Body() id: number) {
    return this.service.delete(id);
  }
}
