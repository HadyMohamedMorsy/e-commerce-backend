import { Body, Controller, Delete, HttpCode, Post } from "@nestjs/common";
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
  public create(@Body() createDto: CartDto) {
    return this.service.create(createDto);
  }

  @Post("/update")
  @Roles("CEO", "TECH_SUPPORT", "STORE_MANAGER", "SUPER_ADMIN", "CONTENT_MANAGER", "SYSTEM_ADMIN")
  public async update(@Body() update: PatchCartDto) {
    return await this.service.update(update);
  }

  @Delete("/delete")
  @Roles("STORE_MANAGER", "SUPER_ADMIN", "CONTENT_MANAGER", "CEO", "SYSTEM_ADMIN")
  public delete(@Body() id: number) {
    return this.service.delete(id);
  }
}
