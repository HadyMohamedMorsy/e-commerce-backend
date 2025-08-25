import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { BaseService } from "src/shared/base/base";
import { APIFeaturesService } from "src/shared/filters/filter.service";
import { ICrudService } from "src/shared/interfaces/crud-service.interface";
import { Repository } from "typeorm";
import { PaymentMethodDto } from "./dtos/create.dto";
import { PatchPaymentMethodDto } from "./dtos/patch.dto";
import { PaymentMethod } from "./payment-method.entity";

@Injectable()
export class PaymentMethodService
  extends BaseService<PaymentMethod, PaymentMethodDto, PatchPaymentMethodDto>
  implements ICrudService<PaymentMethod, PaymentMethodDto, PatchPaymentMethodDto>
{
  constructor(
    apiFeaturesService: APIFeaturesService,
    @InjectRepository(PaymentMethod)
    repository: Repository<PaymentMethod>,
  ) {
    super(repository, apiFeaturesService);
  }
}
