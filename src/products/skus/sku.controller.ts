import { Body, Controller, Patch, Post, Put, Req } from "@nestjs/common";
import { BaseController } from "src/shared/base/base.controller";
import { Roles } from "src/shared/decorators/roles.decorator";
import { SkuDto } from "./dtos/create.dto";
import { PatchSkuDto } from "./dtos/patch.dto";
import { ProductSku } from "./sku.entity";
import { SkuService } from "./sku.service";

@Controller("product-sku")
export class SkuController extends BaseController<ProductSku, SkuDto, PatchSkuDto> {
  constructor(protected readonly service: SkuService) {
    super(service);
  }

  public selectOptions(): Record<string, boolean> {
    return {
      id: true,
      sku: true,
      price: true,
      quantity: true,
      discount: true,
      discountType: true,
      isFeatured: true,
      isOffered: true,
      isOutOfStock: true,
    };
  }

  public getRelationOptions(): Record<string, any> {
    return {
      product: {
        id: true,
        name: true,
      },
    };
  }

  @Post("/store")
  @Roles("CEO", "TECH_SUPPORT", "STORE_MANAGER", "SUPER_ADMIN", "CONTENT_MANAGER", "SYSTEM_ADMIN")
  public create(@Body() createDto: SkuDto, @Req() req: Request) {
    const skuData = {
      sku: createDto.sku,
      price: +createDto.price,
      quantity: +createDto.quantity,
      isOutOfStock: createDto.quantity ? false : true,
      discount: createDto.discount ? +createDto.discount : null,
      discountType: createDto.discountType,
      product: req["product"],
    };
    return this.service.create(skuData, this.selectOptions(), this.getRelationOptions());
  }

  @Put("/update")
  @Roles("CEO", "TECH_SUPPORT", "STORE_MANAGER", "SUPER_ADMIN", "CONTENT_MANAGER", "SYSTEM_ADMIN")
  public async update(@Body() update: PatchSkuDto, @Req() req: Request) {
    return await this.service.update(
      {
        id: update.id,
        sku: update.sku,
        price: update.price,
        isOutOfStock: update.quantity ? false : true,
        quantity: update.quantity,
        discount: update.discount,
        discountType: update.discountType,
        product: req["product"],
      },
      this.selectOptions(),
      this.getRelationOptions(),
    );
  }

  @Patch("/change-featured-status")
  @Roles("CEO", "TECH_SUPPORT", "STORE_MANAGER", "SUPER_ADMIN", "CONTENT_MANAGER", "SYSTEM_ADMIN")
  public async changeFeaturedStatus(@Body() update: { id: number; isFeatured: boolean }) {
    return await this.service.changeStatus(update.id, update.isFeatured, "isFeatured", {
      id: true,
      isFeatured: true,
    });
  }

  @Patch("/change-offered-status")
  @Roles("CEO", "TECH_SUPPORT", "STORE_MANAGER", "SUPER_ADMIN", "CONTENT_MANAGER", "SYSTEM_ADMIN")
  public async changeOfferedStatus(@Body() update: { id: number; isOffered: boolean }) {
    return await this.service.changeStatus(update.id, update.isOffered, "isOffered", {
      id: true,
      isOffered: true,
    });
  }

  @Patch("/change-best-seller-status")
  @Roles("CEO", "TECH_SUPPORT", "STORE_MANAGER", "SUPER_ADMIN", "CONTENT_MANAGER", "SYSTEM_ADMIN")
  public async changeBestSellerStatus(@Body() update: { id: number; isBestSeller: boolean }) {
    return await this.service.changeStatus(update.id, update.isBestSeller, "isBestSeller", {
      id: true,
      isBestSeller: true,
    });
  }

  @Patch("/change-new-status")
  @Roles("CEO", "TECH_SUPPORT", "STORE_MANAGER", "SUPER_ADMIN", "CONTENT_MANAGER", "SYSTEM_ADMIN")
  public async changeNewStatus(@Body() update: { id: number; isNew: boolean }) {
    return await this.service.changeStatus(update.id, update.isNew, "isNew", {
      id: true,
      isNew: true,
    });
  }
}
