import { Body, Controller, Post, Put, Req } from "@nestjs/common";
import { BaseController } from "src/shared/base/base.controller";
import { Roles } from "src/shared/decorators/roles.decorator";
import { RelationOptions, SelectOptions } from "src/shared/interfaces/query.interface";
import { WishlistDto } from "./dtos/create.dto";
import { PatchWishlistsDto } from "./dtos/patch.dto";
import { WishlistsService } from "./wishlist.service";
import { Wishlist } from "./wishlists.entity";

@Controller("wishlists")
export class WishlistsController
  extends BaseController<Wishlist, WishlistDto, PatchWishlistsDto>
  implements SelectOptions, RelationOptions
{
  constructor(protected readonly service: WishlistsService) {
    super(service);
  }

  public selectOptions(): Record<string, boolean> {
    return {
      id: true,
      created_at: true,
      updated_at: true,
    };
  }

  public getRelationOptions(): Record<string, any> {
    return {
      createdBy: {
        id: true,
        firstName: true,
        lastName: true,
      },
    };
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
    return this.service.create(
      {
        isFav: createDto.isFav,
        createdBy: req["createdBy"],
        product: req["product"],
      } as WishlistDto,
      this.selectOptions(),
      this.getRelationOptions(),
    );
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
    return await this.service.update(
      {
        id: update.id,
        isFav: update.isFav,
        createdBy: req["createdBy"],
        product: req["product"],
      },
      this.selectOptions(),
      this.getRelationOptions(),
    );
  }
}
