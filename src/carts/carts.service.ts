import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { BaseCrudService } from "src/shared/base/base-crud";
import { APIFeaturesService } from "src/shared/filters/filter.service";
import { ICrudService } from "src/shared/interfaces/crud-service.interface";
import { Repository } from "typeorm";
import { Cart } from "./cart.entity";
import { CartDto } from "./dtos/create.dto";
import { PatchCartDto } from "./dtos/patch.dto";
@Injectable()
export class CartService
  extends BaseCrudService<Cart, CartDto, PatchCartDto>
  implements ICrudService<Cart, CartDto, PatchCartDto>
{
  constructor(
    apiFeaturesService: APIFeaturesService,
    @InjectRepository(Cart)
    repository: Repository<Cart>,
  ) {
    super(repository, apiFeaturesService);
  }
}
