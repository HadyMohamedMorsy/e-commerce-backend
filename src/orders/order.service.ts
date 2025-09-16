import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { AddressesService } from "src/address/address.service";
import { CouponsService } from "src/coupons/coupon.service";
import { PaymentMethodService } from "src/payment-methods/payment-method.service";
import { Product } from "src/products/products.entity";
import { ProductService } from "src/products/products.service";
import { SkuService } from "src/products/skus/sku.service";
import { BaseService } from "src/shared/base/base";
import { APIFeaturesService } from "src/shared/filters/filter.service";
import { ICrudService } from "src/shared/interfaces/crud-service.interface";
import { EmailService } from "src/shared/services/email.service";
import { DataSource, Repository, SelectQueryBuilder } from "typeorm";
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
    private skuService: SkuService,
    private addressService: AddressesService,
    private couponService: CouponsService,
    private paymentMethodService: PaymentMethodService,
    private emailService: EmailService,
    private dataSource: DataSource,
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

  private generateOrderSuccessEmailTemplate(
    orderNumber: string,
    customerName: string,
    orderTotal: number,
    orderItems: any[],
    discountAmount: number = 0,
    couponCode?: string,
  ): string {
    const orderDate = new Date().toLocaleDateString();
    const subtotal = orderTotal + discountAmount;

    return `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Order Confirmation</title>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 20px; }
          .container { max-width: 600px; margin: 0 auto; background: #fff; border: 1px solid #ddd; border-radius: 8px; overflow: hidden; }
          .header { background: #2c3e50; color: white; padding: 20px; text-align: center; }
          .content { padding: 30px; }
          .order-details { background: #f8f9fa; padding: 20px; border-radius: 5px; margin: 20px 0; }
          .order-item { display: flex; justify-content: space-between; padding: 10px 0; border-bottom: 1px solid #eee; }
          .order-item:last-child { border-bottom: none; }
          .total-section { background: #e8f5e8; padding: 15px; border-radius: 5px; margin-top: 20px; }
          .footer { background: #f8f9fa; padding: 20px; text-align: center; color: #666; font-size: 14px; }
          .success-icon { font-size: 48px; color: #27ae60; margin-bottom: 10px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <div class="success-icon">✓</div>
            <h1>Order Confirmation</h1>
            <p>Thank you for your order!</p>
          </div>
          
          <div class="content">
            <h2>Hello ${customerName},</h2>
            <p>Your order has been successfully placed and is being processed. Here are your order details:</p>
            
            <div class="order-details">
              <h3>Order Information</h3>
              <p><strong>Order Number:</strong> #${orderNumber}</p>
              <p><strong>Order Date:</strong> ${orderDate}</p>
              <p><strong>Status:</strong> Confirmed</p>
            </div>
            
            <div class="order-details">
              <h3>Order Items</h3>
              ${orderItems
                .map(
                  item => `
                <div class="order-item">
                  <div>
                    <strong>${item.product.name}</strong><br>
                    <small>Quantity: ${item.quantity}</small>
                  </div>
                  <div>$${item.price.toFixed(2)}</div>
                </div>
              `,
                )
                .join("")}
            </div>
            
            <div class="total-section">
              <div class="order-item">
                <span><strong>Subtotal:</strong></span>
                <span>$${subtotal.toFixed(2)}</span>
              </div>
              ${
                discountAmount > 0
                  ? `
                <div class="order-item">
                  <span><strong>Discount (${couponCode || "Coupon"}):</strong></span>
                  <span style="color: #27ae60;">-$${discountAmount.toFixed(2)}</span>
                </div>
              `
                  : ""
              }
              <div class="order-item" style="font-size: 18px; font-weight: bold; border-top: 2px solid #27ae60; padding-top: 15px;">
                <span><strong>Total:</strong></span>
                <span>$${orderTotal.toFixed(2)}</span>
              </div>
            </div>
            
            <p>We'll send you another email when your order ships. If you have any questions, please don't hesitate to contact us.</p>
          </div>
          
          <div class="footer">
            <p>Thank you for choosing us!</p>
            <p>This is an automated message, please do not reply to this email.</p>
          </div>
        </div>
      </body>
      </html>
    `;
  }

  private async validateAndUpdateSkuQuantities(
    products: Map<number, Product>,
    orderItems: OrderDto["products"],
  ) {
    // Validate quantities and prepare updates
    const skuUpdates = [];

    for (const item of orderItems) {
      const product = products.get(item.productId);
      if (!product || !product.sku) {
        throw new Error(`Product with ID ${item.productId} or its SKU not found`);
      }

      const currentQuantity = product.sku.quantity;
      if (currentQuantity < item.quantity) {
        throw new Error(
          `Insufficient quantity for product ${product.name}. Available: ${currentQuantity}, Requested: ${item.quantity}`,
        );
      }

      // Prepare SKU update
      skuUpdates.push({
        id: product.sku.id,
        newQuantity: currentQuantity - item.quantity,
        isOutOfStock: currentQuantity - item.quantity <= 0,
      });
    }

    // Update all SKUs using transaction
    await this.dataSource.transaction(async manager => {
      for (const update of skuUpdates) {
        await manager.update("ProductSku", update.id, {
          quantity: update.newQuantity,
          isOutOfStock: update.isOutOfStock,
        });
      }
    });
  }

  private formatOrderResponse(order: Order, total: number, discountAmount: number, coupon: any) {
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

  async storeOrder(createDto: OrderDto): Promise<any> {
    // Step 1: Calculate total amount from products
    const productIds = createDto.products.map(item => item.productId);

    // Load products with SKU relations
    const productsWithSku = await this.productService.findByIdsWithSku(productIds);
    const productMap = new Map(productsWithSku.map(product => [product.id, product]));

    // Step 1.5: Validate and update SKU quantities
    await this.validateAndUpdateSkuQuantities(productMap, createDto.products);

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

    // Step 9: Send order confirmation email
    try {
      if (order.createdBy && order.createdBy.email) {
        // Validate email format before sending
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(order.createdBy.email)) {
          console.error(`Invalid email format: ${order.createdBy.email}`);
          return this.formatOrderResponse(order, total, discountAmount, coupon);
        }

        // Get order items with product details for email
        const orderItemsWithProducts = await this.orderItemRepository.find({
          where: { order: { id: order.id } },
          relations: ["product"],
        });

        const customerName = order.createdBy.firstName
          ? `${order.createdBy.firstName} ${order.createdBy.lastName || ""}`.trim()
          : order.createdBy.username || "Valued Customer";

        const emailTemplate = this.generateOrderSuccessEmailTemplate(
          order.id.toString(),
          customerName,
          order.total,
          orderItemsWithProducts,
          discountAmount,
          coupon?.code,
        );

        await this.emailService.sendOrderConfirmationEmail(
          order.createdBy.email,
          `Order Confirmation #${order.id}`,
          emailTemplate,
        );
      }
    } catch (emailError) {
      // Log email error but don't fail the order creation
      console.error("Failed to send order confirmation email:", emailError);
      console.error("Email error details:", {
        message: emailError.message,
        code: emailError.code,
        errno: emailError.errno,
        syscall: emailError.syscall,
        hostname: emailError.hostname,
      });
    }

    // Step 10: Return formatted response
    return this.formatOrderResponse(order, total, discountAmount, coupon);
  }

  override queryRelationIndex(queryBuilder?: SelectQueryBuilder<any>, filteredRecord?: any) {
    super.queryRelationIndex(queryBuilder, filteredRecord);

    queryBuilder.leftJoinAndSelect("e.payment", "payment");
    queryBuilder.leftJoinAndSelect("e.coupon", "coupon");
    queryBuilder.leftJoinAndSelect("e.address", "address");
    queryBuilder.leftJoinAndSelect("e.orderItems", "orderItems");
    queryBuilder
      .leftJoin("orderItems.product", "product")
      .addSelect(["product.id", "product.name"]);
  }
}
