import { Body, Controller, Delete, HttpCode, Post } from "@nestjs/common";
import { Roles } from "src/shared/decorators/roles.decorator";
import { WishlistDto } from "./dtos/create.dto";
import { PatchWishlistsDto } from "./dtos/patch.dto";
import { WishlistsService } from "./wishlist.service";

@Controller("wishlists")
export class WishlistsController {
  constructor(private readonly service: WishlistsService) {}

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
  public create(@Body() createDto: WishlistDto) {
    return this.service.create(createDto);
  }

  @Post("/update")
  @Roles("CEO", "TECH_SUPPORT", "STORE_MANAGER", "SUPER_ADMIN", "CONTENT_MANAGER", "SYSTEM_ADMIN")
  public async update(@Body() update: PatchWishlistsDto) {
    return await this.service.update(update);
  }

  @Delete("/delete")
  @Roles("STORE_MANAGER", "SUPER_ADMIN", "CONTENT_MANAGER", "CEO", "SYSTEM_ADMIN")
  public delete(@Body() id: number) {
    return this.service.delete(id);
  }
}
