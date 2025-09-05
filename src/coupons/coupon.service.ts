import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { BaseService } from "src/shared/base/base";
import { APIFeaturesService } from "src/shared/filters/filter.service";
import { ICrudService } from "src/shared/interfaces/crud-service.interface";
import { Repository } from "typeorm";
import { Coupon } from "./coupon.entity";
import { CouponDto } from "./dtos/create.dto";
import { PatchCouponDto } from "./dtos/patch.dto";
import { ValidateCouponDto } from "./dtos/validate-coupon.dto";

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

  async validateCoupon(validateDto: ValidateCouponDto) {
    const { code, products } = validateDto;

    // Find coupon by codef
    const coupon = await this.repository.findOne({
      where: { code, isActive: true },
    });

    if (!coupon) {
      throw new NotFoundException("Coupon not found or inactive");
    }

    // Check if coupon is expired
    const currentDate = new Date();
    const expiryDate = new Date(coupon.expiryDate);
    if (currentDate > expiryDate) {
      throw new BadRequestException("Coupon has expired");
    }

    // Check if coupon usage limit exceeded
    if (coupon.usedCount >= coupon.numberOfUsers) {
      throw new BadRequestException("Coupon usage limit exceeded");
    }

    // Calculate total order value and item count
    const totalOrderValue = products.reduce((total, product) => {
      return total + product.price * product.amount;
    }, 0);

    const totalItemCount = products.reduce((total, product) => {
      return total + product.amount;
    }, 0);

    // Check minimum order total price
    if (totalOrderValue < coupon.minOrderTotalPrice) {
      throw new BadRequestException(`Minimum order total price is ${coupon.minOrderTotalPrice}`);
    }

    // Check minimum order item count
    if (totalItemCount < coupon.minOrderItemCount) {
      throw new BadRequestException(`Minimum order item count is ${coupon.minOrderItemCount}`);
    }

    // Return coupon details
    return {
      discount: coupon.discount,
      type: coupon.discountType,
      couponType: coupon.couponType,
      minOrderTotalPrice: coupon.minOrderTotalPrice,
      minOrderItemCount: coupon.minOrderItemCount,
    };
  }
}
