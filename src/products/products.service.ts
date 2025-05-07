import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { BaseService } from "src/shared/base/base-crud";
import { APIFeaturesService } from "src/shared/filters/filter.service";
import { ICrudService } from "src/shared/interfaces/crud-service.interface";
import { Repository } from "typeorm";
import { ProductDto } from "./dtos/create.dto";
import { PatchProductDto } from "./dtos/patch.dto";
import { Product } from "./products.entity";

@Injectable()
export class ProductService
  extends BaseService<Product, ProductDto, PatchProductDto>
  implements ICrudService<Product, ProductDto, PatchProductDto>
{
  constructor(
    apiFeaturesService: APIFeaturesService,
    @InjectRepository(Product)
    repository: Repository<Product>,
  ) {
    super(repository, apiFeaturesService);
  }
}
