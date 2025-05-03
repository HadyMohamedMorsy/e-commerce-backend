import { Body, Controller, Delete, HttpCode, Post, Req } from "@nestjs/common";
import { ReviewDto } from "./dtos/create.dto";
import { PatchReviewDto } from "./dtos/patch.dto";
import { ReviewService } from "./review.service";

@Controller("review")
export class ReviewController {
  constructor(private readonly service: ReviewService) {}

  @Post("/index")
  @HttpCode(200)
  public index(@Body() filter: any) {
    return this.service.findAll(filter);
  }

  @Post("/store")
  public create(@Body() createDto: ReviewDto, @Req() req: Request) {
    return this.service.create({
      title: createDto.title,
      comment: createDto.comment,
      rate: createDto.rate,
      is_liked: createDto.is_liked,
      likes_count: createDto.likes_count,
      createdBy: req["createdBy"],
    });
  }

  @Post("/update")
  public async update(@Body() update: PatchReviewDto, @Req() req: Request) {
    return await this.service.update({
      id: update.id,
      title: update.title,
      comment: update.comment,
      rate: update.rate,
      is_liked: update.is_liked,
      likes_count: update.likes_count,
      createdBy: req["createdBy"],
    });
  }

  @Delete("/delete")
  public delete(@Body() id: number) {
    return this.service.delete(id);
  }
}
