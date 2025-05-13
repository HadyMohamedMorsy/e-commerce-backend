import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { BaseService } from "src/shared/base/base";
import { APIFeaturesService } from "src/shared/filters/filter.service";
import { ICrudService } from "src/shared/interfaces/crud-service.interface";
import { Repository } from "typeorm";
import { Coupon } from "./coupon.entity";
import { CouponDto } from "./dtos/create.dto";
import { PatchCouponDto } from "./dtos/patch.dto";

@Injectable()
export class CouponsService
  extends BaseService<Coupon, CouponDto, PatchCouponDto>
  implements ICrudService<Coupon, CouponDto, PatchCouponDto>
{
  constructor(
    apiFeaturesService: APIFeaturesService,
    @InjectRepository(Coupon)
    repository: Repository<Coupon>,
  ) {
    super(repository, apiFeaturesService);
  }
}
