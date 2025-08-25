import { Body, Controller, Post, Put, Req } from "@nestjs/common";
import { BaseController } from "src/shared/base/base.controller";
import { Roles } from "src/shared/decorators/roles.decorator";
import { RelationOptions, SelectOptions } from "src/shared/interfaces/query.interface";
import { PaymentMethodDto } from "./dtos/create.dto";
import { PatchPaymentMethodDto } from "./dtos/patch.dto";
import { PaymentMethod } from "./payment-method.entity";
import { PaymentMethodService } from "./payment-method.service";

@Controller("payment-methods")
export class PaymentMethodController
  extends BaseController<PaymentMethod, PaymentMethodDto, PatchPaymentMethodDto>
  implements SelectOptions, RelationOptions
{
  constructor(protected readonly service: PaymentMethodService) {
    super(service);
  }

  public selectOptions(): Record<string, boolean> {
    return {
      id: true,
      created_at: true,
      updated_at: true,
      name: true,
      icon: true,
      slug: true,
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
  public create(@Body() create: PaymentMethodDto, @Req() req: Request) {
    return this.service.create(
      {
        name: create.name,
        icon: create.icon,
        slug: create.slug,
        createdBy: req["createdBy"],
      },
      this.selectOptions(),
      this.getRelationOptions(),
    );
  }

  @Put("/update")
  @Roles("CEO", "TECH_SUPPORT", "STORE_MANAGER", "SUPER_ADMIN", "CONTENT_MANAGER", "SYSTEM_ADMIN")
  public async update(@Body() update: PatchPaymentMethodDto, @Req() req: Request) {
    return await this.service.update(
      {
        id: update.id,
        name: update.name,
        icon: update.icon,
        slug: update.slug,
        createdBy: req["createdBy"],
      },
      this.selectOptions(),
      this.getRelationOptions(),
    );
  }
}
