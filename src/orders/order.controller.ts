import { Body, Controller, Post, Put, Req } from "@nestjs/common";
import { BaseController } from "src/shared/base/base.controller";
import { Roles } from "src/shared/decorators/roles.decorator";
import { OrderStatus, PaymentStatus } from "src/shared/enum/global-enum";
import { RelationOptions, SelectOptions } from "src/shared/interfaces/query.interface";
import { OrderDto } from "./dtos/create.dto";
import { PatchOrderDto } from "./dtos/patch.dto";
import { Order } from "./order.entity";
import { OrderService } from "./order.service";

@Controller("order")
export class OrderController
  extends BaseController<Order, OrderDto, PatchOrderDto>
  implements SelectOptions, RelationOptions
{
  constructor(protected readonly service: OrderService) {
    super(service);
  }

  public selectOptions(): Record<string, boolean> {
    return {
      id: true,
      created_at: true,
      updated_at: true,
      orderNumber: true,
      totalAmount: true,
      status: true,
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
  public create(@Body() createDto: OrderDto, @Req() req: Request) {
    return this.service.create({
      ...createDto,
      createdBy: req["createdBy"],
    });
  }

  @Put("/change-order-status")
  @Roles("CEO", "TECH_SUPPORT", "STORE_MANAGER", "SUPER_ADMIN", "CONTENT_MANAGER", "SYSTEM_ADMIN")
  public changeOrderStatus(@Body() update: { id: number; status: OrderStatus }) {
    return this.service.changeStatus(update.id, update.status, "status", {
      id: true,
      status: true,
    });
  }

  @Put("/change-payment-status")
  @Roles("CEO", "TECH_SUPPORT", "STORE_MANAGER", "SUPER_ADMIN", "CONTENT_MANAGER", "SYSTEM_ADMIN")
  public changePaymentStatus(@Body() update: { id: number; status: PaymentStatus }) {
    return this.service.changeStatus(update.id, update.status, "paymentStatus", {
      id: true,
      paymentStatus: true,
    });
  }

  @Put("/update")
  @Roles("CEO", "TECH_SUPPORT", "STORE_MANAGER", "SUPER_ADMIN", "CONTENT_MANAGER", "SYSTEM_ADMIN")
  public async update(@Body() update: PatchOrderDto) {
    return await this.service.update(update);
  }
}
