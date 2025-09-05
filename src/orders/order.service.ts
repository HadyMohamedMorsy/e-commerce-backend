import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { AddressesService } from "src/address/address.service";
import { CouponsService } from "src/coupons/coupon.service";
import { PaymentMethodService } from "src/payment-methods/payment-method.service";
import { Product } from "src/products/products.entity";
import { ProductService } from "src/products/products.service";
import { BaseService } from "src/shared/base/base";
import { APIFeaturesService } from "src/shared/filters/filter.service";
import { ICrudService } from "src/shared/interfaces/crud-service.interface";
import { Repository } from "typeorm";
import { OrderDto } from "./dtos/create.dto";
import { PatchOrderDto } from "./dtos/patch.dto";
import { OrderItem } from "./order-item.entity";
import { Order } from "./order.entity";

@Injectable()
export class OrderService
  extends BaseService<Order, OrderDto, PatchOrderDto>
  implements ICrudService<Order, OrderDto, PatchOrderDto>
{
  constructor(
    apiFeaturesService: APIFeaturesService,
    @InjectRepository(Order)
    repository: Repository<Order>,
    @InjectRepository(OrderItem)
    private orderItemRepository: Repository<OrderItem>,
    private productService: ProductService,
    private addressService: AddressesService,
    private couponService: CouponsService,
    private paymentMethodService: PaymentMethodService,
  ) {
    super(repository, apiFeaturesService);
  }

  private async prepareOrderItems(
    order: Order,
    orderItems: OrderDto["products"],
    products: Map<number, Product>,
  ) {
    return orderItems.reduce(
      (acc, item) => {
        const product = products.get(item.productId);
        if (!product) {
          throw new Error(`Product with ID ${item.productId} not found`);
        }

        const orderItem = this.orderItemRepository.create({
          order,
          product,
          quantity: item.quantity,
          price: item.price,
        });

        return {
          orderItems: [...acc.orderItems, orderItem],
          total: acc.total + item.price * item.quantity,
        };
      },
      { orderItems: [], total: 0 },
    );
  }

  private calculateCouponDiscount(coupon: any, total: number): number {
    if (!coupon) return 0;

    // Check if coupon is active and not expired
    const now = new Date();
    const expiryDate = new Date(coupon.expiryDate);
    if (!coupon.isActive || now > expiryDate) {
      return 0;
    }

    // Check minimum order total requirement
    if (coupon.minOrderTotalPrice && total < coupon.minOrderTotalPrice) {
      return 0;
    }

    // Calculate discount based on discount type
    if (coupon.discountType === "percentage") {
      return (total * coupon.discount) / 100;
    } else if (coupon.discountType === "fixed") {
      return Math.min(coupon.discount, total); // Don't exceed the total amount
    }

    return 0;
  }

  async storeOrder(createDto: OrderDto): Promise<any> {
    // Step 1: Calculate total amount from products
    const productIds = createDto.products.map(item => item.productId);
    const products = await this.productService.findByIds(productIds);
    const productMap = new Map(products.map(product => [product.id, product]));

    const { orderItems, total } = await this.prepareOrderItems(
      null, // We'll set the order after creating it
      createDto.products,
      productMap,
    );

    // Step 2: Find payment by ID
    const payments = await this.paymentMethodService.findByIds([createDto.payment_id]);

    if (!payments || payments.length === 0) {
      throw new Error(`Payment with ID ${createDto.payment_id} not found`);
    }
    const payment = payments[0];

    // Step 3: Find coupon if provided
    let coupon = null;
    if (createDto.coupon_id) {
      try {
        const coupons = await this.couponService.findByIds([createDto.coupon_id]);
        if (coupons && coupons.length > 0) {
          coupon = coupons[0];
        } else {
          throw new Error(`Coupon with ID ${createDto.coupon_id} not found`);
        }
      } catch {
        throw new Error(`Coupon with ID ${createDto.coupon_id} not found`);
      }
    }

    // Step 4: Find address if provided
    let address = null;
    if (createDto.address_id) {
      try {
        address = await this.addressService.findByIds([createDto.address_id]);
      } catch {
        throw new Error(`Address with ID ${createDto.address_id} not found`);
      }
    }

    // Step 5: Calculate final total with coupon discount
    const discountAmount = this.calculateCouponDiscount(coupon, total);
    const finalTotal = total - discountAmount;

    // Step 6: Create order
    const order = await this.repository.save({
      payment,
      coupon,
      address,
      status: createDto.status,
      paymentStatus: createDto.paymentStatus,
      total: finalTotal,
      createdBy: createDto.createdBy,
    });

    // Step 7: Create order items
    const orderItemsWithOrder = orderItems.map(item => ({
      ...item,
      order,
    }));
    await this.orderItemRepository.save(orderItemsWithOrder);

    // Step 8: Update coupon used count if coupon exists
    if (coupon) {
      await this.couponService.update(coupon.id, {
        usedCount: coupon.usedCount + 1,
      });
    }

    // Step 9: Return formatted response
    return {
      order_id: order.id.toString(),
      order_number: order.id.toString(),
      subtotal: total,
      discount_amount: discountAmount,
      total_amount: order.total,
      status: order.status,
      createdAt: order.createdAt,
      coupon_applied: coupon
        ? {
            code: coupon.code,
            discount_type: coupon.discountType,
            discount_value: coupon.discount,
            discount_amount: discountAmount,
          }
        : null,
    };
  }
}
