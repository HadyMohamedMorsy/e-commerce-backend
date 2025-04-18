import { Body, Controller, Delete, HttpCode, Post } from "@nestjs/common";
import { CouponsService } from "./coupon.service";
import { CouponDto } from "./dtos/create.dto";
import { PatchCouponDto } from "./dtos/patch.dto";

@Controller("coupon")
export class CouponController {
  constructor(private readonly service: CouponsService) {}

  @Post("/index")
  @HttpCode(200)
  public index(@Body() filter: any) {
    return this.service.findAll(filter);
  }

  @Post("/store")
  public create(@Body() createDto: CouponDto) {
    return this.service.create(createDto);
  }

  @Post("/update")
  public async update(@Body() update: PatchCouponDto) {
    return await this.service.update(update);
  }

  @Delete("/delete")
  public delete(@Body() id: number) {
    return this.service.delete(id);
  }
}
