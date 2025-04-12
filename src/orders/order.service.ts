import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { BaseCrudService } from "src/shared/base/base-crud";
import { APIFeaturesService } from "src/shared/filters/filter.service";
import { ICrudService } from "src/shared/interfaces/crud-service.interface";
import { Repository } from "typeorm";
import { OrderDto } from "./dtos/create.dto";
import { PatchOrderDto } from "./dtos/patch.dto";
import { Order } from "./order.entity";
@Injectable()
export class OrderService
  extends BaseCrudService<Order, OrderDto, PatchOrderDto>
  implements ICrudService<Order, OrderDto, PatchOrderDto>
{
  constructor(
    apiFeaturesService: APIFeaturesService,
    @InjectRepository(Order)
    repository: Repository<Order>,
  ) {
    super(repository, apiFeaturesService);
  }
}
