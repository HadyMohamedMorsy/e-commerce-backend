import { Body, Controller, Post, Put, Req } from "@nestjs/common";
import { BaseController } from "src/shared/base/base.controller";
import { Roles } from "src/shared/decorators/roles.decorator";
import { Cart } from "./cart.entity";
import { CartService } from "./carts.service";
import { CartDto } from "./dtos/create.dto";
import { PatchCartDto } from "./dtos/patch.dto";

@Controller("cart")
export class CartController extends BaseController<Cart, CartDto, PatchCartDto> {
  constructor(protected readonly service: CartService) {
    super(service);
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
}
