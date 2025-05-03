import { Body, Controller, Delete, HttpCode, Post, Req } from "@nestjs/common";
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
  public create(@Body() createDto: CouponDto, @Req() req: Request) {
    return this.service.create({
      code: createDto.code,
      couponType: createDto.couponType,
      discount: createDto.discount,
      discountType: createDto.discountType,
      minOrderTotalPrice: createDto.minOrderTotalPrice,
      minOrderItemCount: createDto.minOrderItemCount,
      isActive: createDto.isActive,
      expiry_date: createDto.expiry_date,
      min_order_total_price: 0,
      min_order_item_count: 0,
      createdBy: req["createdBy"],
    });
  }

  @Post("/update")
  public async update(@Body() update: PatchCouponDto, @Req() req: Request) {
    return await this.service.update({
      id: update.id,
      code: update.code,
      couponType: update.couponType,
      discount: update.discount,
      discountType: update.discountType,
      minOrderTotalPrice: update.minOrderTotalPrice,
      minOrderItemCount: update.minOrderItemCount,
      isActive: update.isActive,
      expiry_date: update.expiry_date,
      min_order_total_price: 0,
      min_order_item_count: 0,
      createdBy: req["createdBy"],
    });
  }

  @Post("/change-status")
  public changeStatus(@Body() update: PatchCouponDto) {
    return this.service.changeStatus(update.id, update.isActive);
  }

  @Delete("/delete")
  public delete(@Body() id: number) {
    return this.service.delete(id);
  }
}
