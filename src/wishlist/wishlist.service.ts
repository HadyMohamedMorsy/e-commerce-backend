import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { BaseService } from "src/shared/base/base-crud";
import { APIFeaturesService } from "src/shared/filters/filter.service";
import { ICrudService } from "src/shared/interfaces/crud-service.interface";
import { Repository, SelectQueryBuilder } from "typeorm";
import { WishlistDto } from "./dtos/create.dto";
import { PatchWishlistsDto } from "./dtos/patch.dto";
import { Wishlist } from "./wishlists.entity";
@Injectable()
export class WishlistsService
  extends BaseService<Wishlist, WishlistDto, PatchWishlistsDto>
  implements ICrudService<Wishlist, WishlistDto, PatchWishlistsDto>
{
  constructor(
    apiFeaturesService: APIFeaturesService,
    @InjectRepository(Wishlist)
    repository: Repository<Wishlist>,
  ) {
    super(repository, apiFeaturesService);
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  override queryRelation(queryBuilder?: SelectQueryBuilder<any>) {}
}
