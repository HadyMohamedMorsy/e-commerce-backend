import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { AddressesService } from "src/address/address.service";
import { BaseService } from "src/shared/base/base";
import { APIFeaturesService } from "src/shared/filters/filter.service";
import { ICrudService } from "src/shared/interfaces/crud-service.interface";
import { EmailService } from "src/shared/services/email.service";
import { Repository, SelectQueryBuilder } from "typeorm";
import { AnswerService } from "../answers/answer.service";
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
    private addressService: AddressesService,
    private answerService: AnswerService,
    private emailService: EmailService,
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

    // Step 5: Find and validate address
    let address = null;
    if (createDto.addressId) {
      address = await this.addressService.findOne(createDto.addressId);
      if (!address) {
        throw new Error("Address not found");
      }
    }

    // Step 6: Find and validate answers
    let answers = [];
    if (createDto.answerIds && createDto.answerIds.length > 0) {
      answers = await this.answerService.findByIds(createDto.answerIds);
      if (answers.length !== createDto.answerIds.length) {
        throw new Error("Some answers not found");
      }
    }

    // Step 7: Calculate total price
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

    // Step 8: Create order custom using parent create method
    const orderData = {
      totalPrice,
      status: "pending",
      images: createDto.images || [],
      addressId: createDto.addressId,
      addresses: address,
      answerIds: createDto.answerIds,
      answers: answers,
      couponId: createDto.couponId,
      coupons: coupon,
      paperTypeId: createDto.paperTypeId,
      paperType: paperType,
      paymentMethodId: createDto.paymentMethodId,
      paymentMethod: paymentMethod,
      createdBy: createDto.createdBy,
    };

    const result = await super.create(orderData, selectOptions, relationOptions);

    // Step 9: Send welcome email to customer
    try {
      if (address && address.user && address.user.email) {
        const orderEmailHtml = `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
            <div style="text-align: center; background: linear-gradient(135deg, #B22947 0%, #3D2545 100%); color: white; padding: 30px; border-radius: 10px 10px 0 0;">
              <h1 style="margin: 0; font-size: 28px;">تم استلام طلبك! 🎉</h1>
            </div>
            
            <div style="background: #FFF5E9; padding: 30px; border-radius: 0 0 10px 10px; border: 1px solid #E6A238;">
              <p style="font-size: 16px; line-height: 1.6; color: #3D2545; margin-bottom: 20px;">
                مرحباً ${address.user.firstName || "عزيزي العميل"}! 
              </p>
              
              <p style="font-size: 16px; line-height: 1.6; color: #3D2545; margin-bottom: 20px;">
                شكراً لك على طلبك المخصص! تم استلام طلبك بنجاح وسنقوم بمراجعته قريباً.
              </p>
              
              <div style="background: white; padding: 20px; border-radius: 8px; border-left: 4px solid #E6A238; margin: 20px 0; box-shadow: 0 2px 8px rgba(230, 162, 56, 0.1);">
                <h3 style="color: #B22947; margin-top: 0;">تفاصيل الطلب:</h3>
                <p style="color: #3D2545; margin: 5px 0;"><strong>رقم الطلب:</strong> #${result.id}</p>
                <p style="color: #3D2545; margin: 5px 0;"><strong>المجموع:</strong> ${totalPrice} جنيه</p>
                <p style="color: #3D2545; margin: 5px 0;"><strong>الحالة:</strong> ${result.status}</p>
                ${books.length > 0 ? `<p style="color: #3D2545; margin: 5px 0;"><strong>الكتب:</strong> ${books.length} كتاب</p>` : ""}
                ${paperType ? `<p style="color: #3D2545; margin: 5px 0;"><strong>نوع الورق:</strong> ${paperType.name}</p>` : ""}
              </div>
              
              <p style="font-size: 16px; line-height: 1.6; color: #3D2545; margin-bottom: 20px;">
                سنتواصل معك قريباً لتأكيد تفاصيل الطلب وتحديد موعد التسليم.
              </p>
              
              <p style="font-size: 14px; color: #3D2545; margin-top: 30px;">
                إذا كان لديك أي أسئلة، لا تتردد في التواصل معنا.
              </p>
              
              <div style="text-align: center; margin-top: 30px;">
                <p style="color: #B22947; font-weight: bold; font-size: 16px;">
                  فريق العمل 🚀
                </p>
              </div>
            </div>
          </div>
        `;

        await this.emailService.sendOrderConfirmationEmail(
          address.user.email,
          "تم استلام طلبك المخصص! 🎉",
          orderEmailHtml,
        );
      }
    } catch (error) {
      console.error("Failed to send order confirmation email:", error);
      // لا نريد أن نفشل الطلب لو فشل إرسال الإيميل
    }

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
