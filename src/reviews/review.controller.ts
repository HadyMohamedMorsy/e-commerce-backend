import { Body, Controller, Delete, HttpCode, Post, Req } from "@nestjs/common";
import { Roles } from "src/shared/decorators/roles.decorator";
import { ReviewDto } from "./dtos/create.dto";
import { PatchReviewDto } from "./dtos/patch.dto";
import { ReviewService } from "./review.service";

@Controller("review")
export class ReviewController {
  constructor(private readonly service: ReviewService) {}

  @Post("/index")
  @Roles(
    "CEO",
    "TECH_SUPPORT",
    "STORE_MANAGER",
    "SUPER_ADMIN",
    "INVENTORY_MANAGER",
    "CONTENT_MANAGER",
    "SYSTEM_ADMIN",
  )
  @HttpCode(200)
  public index(@Body() filter: any) {
    return this.service.findAll(filter);
  }

  @Post("/store")
  @Roles("CEO", "TECH_SUPPORT", "STORE_MANAGER", "SUPER_ADMIN", "CONTENT_MANAGER", "SYSTEM_ADMIN")
  public create(@Body() createDto: ReviewDto, @Req() req: Request) {
    return this.service.create({
      title: createDto.title,
      comment: createDto.comment,
      rate: createDto.rate,
      isLiked: createDto.isLiked,
      likesCount: createDto.likesCount,
      isApproved: createDto.isApproved,
      createdBy: req["createdBy"],
      product: req["product"],
    });
  }

  @Post("/update")
  @Roles("CEO", "TECH_SUPPORT", "STORE_MANAGER", "SUPER_ADMIN", "CONTENT_MANAGER", "SYSTEM_ADMIN")
  public async update(@Body() update: PatchReviewDto, @Req() req: Request) {
    return await this.service.update({
      id: update.id,
      title: update.title,
      comment: update.comment,
      rate: update.rate,
      isLiked: update.isLiked,
      likesCount: update.likesCount,
      isApproved: update.isApproved,
      createdBy: req["createdBy"],
      product: req["product"],
    });
  }

  @Delete("/delete")
  @Roles("STORE_MANAGER", "SUPER_ADMIN", "CONTENT_MANAGER", "CEO", "SYSTEM_ADMIN")
  public delete(@Body() id: number) {
    return this.service.delete(id);
  }
}
