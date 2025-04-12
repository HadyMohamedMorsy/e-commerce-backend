import { Body, Controller, Delete, HttpCode, Post } from "@nestjs/common";
import { WishlistDto } from "./dtos/create.dto";
import { PatchWishlistsDto } from "./dtos/patch.dto";
import { WishlistsService } from "./wishlist.service";

@Controller("wishlists")
export class WishlistsController {
  constructor(private readonly service: WishlistsService) {}

  @Post("/index")
  @HttpCode(200)
  public index(@Body() filter: any) {
    return this.service.findAll(filter);
  }

  @Post("/store")
  public create(@Body() createDto: WishlistDto) {
    return this.service.create(createDto);
  }

  @Post("/update")
  public async update(@Body() update: PatchWishlistsDto) {
    return await this.service.update(update);
  }

  @Delete("/delete")
  public delete(@Body() id: number) {
    return this.service.delete(id);
  }
}
