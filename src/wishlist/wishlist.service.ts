import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { BaseCrudService } from "src/shared/base/base-crud";
import { APIFeaturesService } from "src/shared/filters/filter.service";
import { ICrudService } from "src/shared/interfaces/crud-service.interface";
import { Repository } from "typeorm";
import { WishlistDto } from "./dtos/create.dto";
import { PatchWishlistsDto } from "./dtos/patch.dto";
import { Wishlist } from "./wishlists.entity";
@Injectable()
export class WishlistsService
  extends BaseCrudService<Wishlist, WishlistDto, PatchWishlistsDto>
  implements ICrudService<Wishlist, WishlistDto, PatchWishlistsDto>
{
  constructor(
    apiFeaturesService: APIFeaturesService,
    @InjectRepository(Wishlist)
    repository: Repository<Wishlist>,
  ) {
    super(repository, apiFeaturesService);
  }
}
