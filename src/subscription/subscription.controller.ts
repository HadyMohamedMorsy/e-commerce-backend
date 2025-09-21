import { Body, Controller, Post, Put } from "@nestjs/common";
import { BaseController } from "src/shared/base/base.controller";
import { Auth } from "src/shared/decorators/auth.decorator";
import { Roles } from "src/shared/decorators/roles.decorator";
import { AuthType } from "src/shared/enum/global-enum";
import { SelectOptions } from "src/shared/interfaces/query.interface";
import { SubscriptionDto } from "./dtos/create.dto";
import { PatchSubscriptionDto } from "./dtos/patch.dto";
import { Sub } from "./subscription.entity";
import { SubService } from "./subscription.service";

@Controller("sub")
export class SubscriptionController
  extends BaseController<Sub, SubscriptionDto, PatchSubscriptionDto>
  implements SelectOptions
{
  constructor(protected readonly service: SubService) {
    super(service);
  }

  public selectOptions(): Record<string, boolean> {
    return {
      id: true,
      email: true,
    };
  }

  @Post("/subscribe")
  @Auth(AuthType.None)
  public async create(@Body() create: SubscriptionDto) {
    return await this.service.create({
      email: create.email,
    });
  }

  @Put("/update")
  @Roles("CEO", "TECH_SUPPORT", "STORE_MANAGER", "SUPER_ADMIN", "CONTENT_MANAGER", "SYSTEM_ADMIN")
  public async update(@Body() update: PatchSubscriptionDto) {
    return await this.service.update(
      {
        id: update.id,
        email: update.email,
      },
      this.selectOptions(),
    );
  }
}
