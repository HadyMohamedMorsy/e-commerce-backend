import { Body, Controller, Delete, HttpCode, Post, Put, Req } from "@nestjs/common";
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
    "CUSTOMER",
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
  @Roles(
    "CEO",
    "CUSTOMER",
    "TECH_SUPPORT",
    "STORE_MANAGER",
    "SUPER_ADMIN",
    "CONTENT_MANAGER",
    "SYSTEM_ADMIN",
  )
  public create(@Body() createDto: WishlistDto, @Req() req: Request) {
    return this.service.create({
      isFav: createDto.isFav,
      createdBy: req["createdBy"],
      product: req["product"],
    } as WishlistDto);
  }

  @Put("/update")
  @Roles(
    "CEO",
    "CUSTOMER",
    "TECH_SUPPORT",
    "STORE_MANAGER",
    "SUPER_ADMIN",
    "CONTENT_MANAGER",
    "SYSTEM_ADMIN",
  )
  public async update(@Body() update: PatchWishlistsDto, @Req() req: Request) {
    return await this.service.update({
      id: update.id,
      isFav: update.isFav,
      createdBy: req["createdBy"],
      product: req["product"],
    });
  }

  @Delete("/delete")
  @Roles("STORE_MANAGER", "CUSTOMER", "SUPER_ADMIN", "CONTENT_MANAGER", "CEO", "SYSTEM_ADMIN")
  public delete(@Body() id: number) {
    return this.service.delete(id);
  }
}
