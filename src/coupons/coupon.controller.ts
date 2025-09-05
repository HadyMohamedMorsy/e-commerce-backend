import { Body, Controller, Patch, Post, Put, Req } from "@nestjs/common";
import { BaseController } from "src/shared/base/base.controller";
import { Roles } from "src/shared/decorators/roles.decorator";
import { RelationOptions, SelectOptions } from "src/shared/interfaces/query.interface";
import { Coupon } from "./coupon.entity";
import { CouponsService } from "./coupon.service";
import { CouponDto } from "./dtos/create.dto";
import { PatchCouponDto } from "./dtos/patch.dto";
import { ValidateCouponDto } from "./dtos/validate-coupon.dto";

@Controller("coupon")
export class CouponController
  extends BaseController<Coupon, CouponDto, PatchCouponDto>
  implements SelectOptions, RelationOptions
{
  constructor(protected readonly service: CouponsService) {
    super(service);
  }

  public selectOptions(): Record<string, boolean> {
    return {
      id: true,
      created_at: true,
      updated_at: true,
      code: true,
      couponType: true,
      discount: true,
      discountType: true,
      minOrderTotalPrice: true,
      minOrderItemCount: true,
      numberOfUsers: true,
      isActive: true,
      expiryDate: true,
      createdBy: true,
    };
  }

  public getRelationOptions(): Record<string, any> {
    return {
      createdBy: {
        id: true,
        firstName: true,
        lastName: true,
      },
    };
  }

  @Post("/store")
  @Roles("CEO", "TECH_SUPPORT", "STORE_MANAGER", "SUPER_ADMIN", "CONTENT_MANAGER", "SYSTEM_ADMIN")
  public create(@Body() createDto: CouponDto, @Req() req: Request) {
    return this.service.create(
      {
        code: createDto.code,
        couponType: createDto.couponType,
        discount: createDto.discount,
        discountType: createDto.discountType,
        minOrderTotalPrice: createDto.minOrderTotalPrice,
        minOrderItemCount: createDto.minOrderItemCount,
        numberOfUsers: createDto.numberOfUsers,
        isActive: createDto.isActive,
        expiryDate: createDto.expiryDate,
        createdBy: req["createdBy"],
      },
      this.selectOptions(),
      this.getRelationOptions(),
    );
  }

  @Put("/update")
  @Roles("CEO", "TECH_SUPPORT", "STORE_MANAGER", "SUPER_ADMIN", "CONTENT_MANAGER", "SYSTEM_ADMIN")
  public async update(@Body() update: PatchCouponDto, @Req() req: Request) {
    return await this.service.update(
      {
        id: update.id,
        code: update.code,
        couponType: update.couponType,
        discount: update.discount,
        discountType: update.discountType,
        minOrderTotalPrice: update.minOrderTotalPrice,
        minOrderItemCount: update.minOrderItemCount,
        numberOfUsers: update.numberOfUsers,
        isActive: update.isActive,
        expiryDate: update.expiryDate,
        createdBy: req["createdBy"],
      },
      this.selectOptions(),
      this.getRelationOptions(),
    );
  }

  @Patch("/change-active-status")
  @Roles("CEO", "TECH_SUPPORT", "STORE_MANAGER", "SUPER_ADMIN", "CONTENT_MANAGER", "SYSTEM_ADMIN")
  public changeStatus(@Body() update: PatchCouponDto) {
    return this.service.changeStatus(update.id, update.isActive, "isActive", {
      id: true,
      isActive: true,
    });
  }

  @Post("/validate")
  public async validateCoupon(@Body() validateDto: ValidateCouponDto) {
    return await this.service.validateCoupon(validateDto);
  }
}
