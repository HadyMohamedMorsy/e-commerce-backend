import { Body, Controller, Patch, Post, Put, Req } from "@nestjs/common";
import { BaseController } from "src/shared/base/base.controller";
import { Roles } from "src/shared/decorators/roles.decorator";
import { RelationOptions, SelectOptions } from "src/shared/interfaces/query.interface";
import { ReviewDto } from "./dtos/create.dto";
import { PatchReviewDto } from "./dtos/patch.dto";
import { Review } from "./review.entity";
import { ReviewService } from "./review.service";

@Controller("review")
export class ReviewController
  extends BaseController<Review, ReviewDto, PatchReviewDto>
  implements SelectOptions, RelationOptions
{
  constructor(protected readonly service: ReviewService) {
    super(service);
  }

  public selectOptions(): Record<string, boolean> {
    return {
      id: true,
      comment: true,
      rate: true,
      isApproved: true,
    };
  }

  public getRelationOptions(): Record<string, any> {
    return {
      createdBy: {
        id: true,
        firstName: true,
        lastName: true,
      },
      product: {
        id: true,
        name: true,
      },
    };
  }

  @Post("/store")
  @Roles("CEO", "TECH_SUPPORT", "STORE_MANAGER", "SUPER_ADMIN", "CONTENT_MANAGER", "SYSTEM_ADMIN")
  public create(@Body() createDto: ReviewDto, @Req() req: Request) {
    return this.service.create(
      {
        comment: createDto.comment,
        rate: createDto.rate,
        isApproved: createDto.isApproved,
        createdBy: req["createdBy"],
        product: req["product"],
      },
      this.selectOptions(),
      this.getRelationOptions(),
    );
  }

  @Put("/update")
  @Roles("CEO", "TECH_SUPPORT", "STORE_MANAGER", "SUPER_ADMIN", "CONTENT_MANAGER", "SYSTEM_ADMIN")
  public async update(@Body() update: PatchReviewDto, @Req() req: Request) {
    return await this.service.update(
      {
        id: update.id,
        comment: update.comment,
        rate: update.rate,
        isApproved: update.isApproved,
        createdBy: req["createdBy"],
        product: req["product"],
      },
      this.selectOptions(),
      this.getRelationOptions(),
    );
  }

  @Patch("/change-approve-status")
  @Roles("CEO", "TECH_SUPPORT", "STORE_MANAGER", "SUPER_ADMIN", "CONTENT_MANAGER", "SYSTEM_ADMIN")
  public changeApproveStatus(@Body() update: { id: number; isApproved: boolean }) {
    return this.service.changeStatus(update.id, update.isApproved, "isApproved", {
      id: true,
      isApproved: true,
    });
  }
}
