import { Body, Controller, Get, Post, Put, Req } from "@nestjs/common";
import { BaseController } from "src/shared/base/base.controller";
import { Roles } from "src/shared/decorators/roles.decorator";
import { RelationOptions, SelectOptions } from "src/shared/interfaces/query.interface";
import { PaperTypeDto } from "./dtos/create.dto";
import { PatchPaperTypeDto } from "./dtos/patch.dto";
import { PaperType } from "./paper-type.entity";
import { PaperTypeService } from "./paper-type.service";

@Controller("paper-type")
export class PaperTypeController
  extends BaseController<PaperType, PaperTypeDto, PatchPaperTypeDto>
  implements SelectOptions, RelationOptions
{
  constructor(protected readonly service: PaperTypeService) {
    super(service);
  }

  public selectOptions(): Record<string, boolean> {
    return {
      id: true,
      created_at: true,
      updated_at: true,
      paperName: true,
      price: true,
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
  public create(@Body() create: PaperTypeDto, @Req() req: Request) {
    return this.service.create(
      {
        paperName: create.paperName,
        price: create.price,
        createdBy: req["createdBy"],
      },
      this.selectOptions(),
      this.getRelationOptions(),
    );
  }

  @Put("/update")
  @Roles("CEO", "TECH_SUPPORT", "STORE_MANAGER", "SUPER_ADMIN", "CONTENT_MANAGER", "SYSTEM_ADMIN")
  public async update(@Body() update: PatchPaperTypeDto, @Req() req: Request) {
    return await this.service.update(
      {
        id: update.id,
        paperName: update.paperName,
        price: update.price,
        createdBy: req["createdBy"],
      },
      this.selectOptions(),
      this.getRelationOptions(),
    );
  }

  @Get("/options")
  public async getOptions() {
    const result = await this.service.findAll({ paperName: true, price: true });

    return result.data.map(paperType => ({
      label: paperType.paperName,
      value: paperType.price,
    }));
  }
}
