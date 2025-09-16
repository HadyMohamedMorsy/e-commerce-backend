import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { BaseService } from "src/shared/base/base";
import { APIFeaturesService } from "src/shared/filters/filter.service";
import { ICrudService } from "src/shared/interfaces/crud-service.interface";
import { Repository, SelectQueryBuilder } from "typeorm";
import { BookService } from "../books/book.service";
import { CouponsService } from "../coupons/coupon.service";
import { PaperTypeService } from "../paper-type/paper-type.service";
import { PaymentMethodService } from "../payment-methods/payment-method.service";
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
    private bookService: BookService,
    private couponService: CouponsService,
    private paperTypeService: PaperTypeService,
    private paymentMethodService: PaymentMethodService,
  ) {
    super(repository, apiFeaturesService);
  }

  /**
   * Override create method with calculations
   */
  async create(
    createDto: OrderCustomDto,
    selectOptions?: any,
    relationOptions?: any,
  ): Promise<any> {
    // Step 1: Find and validate books
    let books = [];
    let booksTotalPrice = 0;
    if (createDto.booksIds && createDto.booksIds.length > 0) {
      books = await this.bookService.findByIds(createDto.booksIds);

      if (books.length !== createDto.booksIds.length) {
        throw new Error("Some books not found");
      }

      booksTotalPrice = books.reduce((total, book) => total + (+book.price || 0), 0);
    }

    // Step 2: Find and validate paper type
    let paperType = null;
    let paperPrice = 0;
    if (createDto.paperTypeId) {
      const paperResult = await this.paperTypeService.findByIds([createDto.paperTypeId]);
      paperType = paperResult[0];

      if (!paperType) {
        throw new Error("Paper type not found");
      }

      paperPrice = +paperType.price || 0;
    }

    // Step 3: Find and validate payment method
    let paymentMethod = null;
    if (createDto.paymentMethodId) {
      const paymentResult = await this.paymentMethodService.findByIds([createDto.paymentMethodId]);
      paymentMethod = paymentResult[0];

      if (!paymentMethod) {
        throw new Error("Payment method not found");
      }
    }

    // Step 4: Find and validate coupon
    let coupon = null;
    let discountAmount = 0;
    if (createDto.couponId) {
      const couponResult = await this.couponService.findByIds([createDto.couponId]);
      coupon = couponResult[0];

      if (!coupon) {
        throw new Error("Coupon not found");
      }
    }

    // Step 5: Calculate total price
    const subtotal = +booksTotalPrice + +paperPrice;

    // Apply coupon discount if valid
    if (coupon && subtotal >= (+coupon.minOrderAmount || 0)) {
      if (coupon.discountType === "percentage") {
        discountAmount = (subtotal * +coupon.discountValue) / 100;
      } else if (coupon.discountType === "fixed") {
        discountAmount = +coupon.discountValue;
      }
    }

    const totalPrice = subtotal - +discountAmount;

    // Step 6: Create order custom using parent create method
    const orderData = {
      totalPrice,
      status: "pending",
      images: createDto.images || [],
      couponId: createDto.couponId,
      paperTypeId: createDto.paperTypeId,
      paymentMethodId: createDto.paymentMethodId,
      createdBy: createDto.createdBy,
    };

    const result = await super.create(orderData, selectOptions, relationOptions);

    // Add calculation details to response
    if (result && typeof result === "object") {
      (result as any).calculation = {
        booksTotal: booksTotalPrice,
        paperPrice,
        subtotal,
        discountAmount,
        totalPrice,
      };
    }

    return result;
  }

  override queryRelationIndex(queryBuilder?: SelectQueryBuilder<any>, filteredRecord?: any) {
    super.queryRelationIndex(queryBuilder, filteredRecord);
    queryBuilder.leftJoinAndSelect("e.coupons", "coupons");
    queryBuilder.leftJoinAndSelect("e.paperType", "paperType");
    queryBuilder.leftJoinAndSelect("e.paymentMethod", "paymentMethod");
  }
}
