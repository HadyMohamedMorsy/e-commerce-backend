import { Body, Controller, Post, Put, Req } from "@nestjs/common";
import { BaseController } from "src/shared/base/base.controller";
import { Roles } from "src/shared/decorators/roles.decorator";
import { RelationOptions, SelectOptions } from "src/shared/interfaces/query.interface";
import { OrderCustomDto } from "./dtos/create.dto";
import { PatchOrderCustomDto } from "./dtos/patch.dto";
import { OrderCustom } from "./order-custom.entity";
import { OrderCustomService } from "./order-custom.service";

@Controller("order-customs")
export class OrderCustomController
  extends BaseController<OrderCustom, OrderCustomDto, PatchOrderCustomDto>
  implements SelectOptions, RelationOptions
{
  constructor(protected readonly service: OrderCustomService) {
    super(service);
  }

  public selectOptions(): Record<string, boolean> {
    return {
      id: true,
      created_at: true,
      updated_at: true,
      totalPrice: true,
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
      paymentMethod: {
        id: true,
        name: true,
        icon: true,
        slug: true,
      },
      books: {
        id: true,
        title: true,
        description: true,
        price: true,
        svg: true,
      },
    };
  }

  @Post("/store")
  @Roles("CEO", "TECH_SUPPORT", "STORE_MANAGER", "SUPER_ADMIN", "CONTENT_MANAGER", "SYSTEM_ADMIN")
  public create(@Body() create: OrderCustomDto, @Req() req: Request) {
    return this.service.create(
      {
        status: create.status,
        createdBy: req["createdBy"],
      },
      this.selectOptions(),
      this.getRelationOptions(),
    );
  }

  @Put("/update")
  @Roles("CEO", "TECH_SUPPORT", "STORE_MANAGER", "SUPER_ADMIN", "CONTENT_MANAGER", "SYSTEM_ADMIN")
  public async update(@Body() update: PatchOrderCustomDto, @Req() req: Request) {
    return await this.service.update(
      {
        id: update.id,
        status: update.status,
        createdBy: req["createdBy"],
      },
      this.selectOptions(),
      this.getRelationOptions(),
    );
  }
}
