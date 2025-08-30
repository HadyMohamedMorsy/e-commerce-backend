import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { BaseService } from "src/shared/base/base";
import { APIFeaturesService } from "src/shared/filters/filter.service";
import { ICrudService } from "src/shared/interfaces/crud-service.interface";
import { Repository } from "typeorm";
import { OrderCustomDto } from "./dtos/create.dto";
import { PatchOrderCustomDto } from "./dtos/patch.dto";
import { OrderCustom } from "./order-custom.entity";

@Injectable()
export class OrderCustomService
  extends BaseService<OrderCustom, OrderCustomDto, PatchOrderCustomDto>
  implements ICrudService<OrderCustom, OrderCustomDto, PatchOrderCustomDto>
{
  constructor(
    apiFeaturesService: APIFeaturesService,
    @InjectRepository(OrderCustom)
    repository: Repository<OrderCustom>,
  ) {
    super(repository, apiFeaturesService);
  }
}
