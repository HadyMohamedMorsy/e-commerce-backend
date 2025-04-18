import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { BaseCrudService } from "src/shared/base/base-crud";
import { APIFeaturesService } from "src/shared/filters/filter.service";
import { ICrudService } from "src/shared/interfaces/crud-service.interface";
import { Repository } from "typeorm";
import { ReviewDto } from "./dtos/create.dto";
import { PatchReviewDto } from "./dtos/patch.dto";
import { Review } from "./review.entity";

@Injectable()
export class ReviewService
  extends BaseCrudService<Review, ReviewDto, PatchReviewDto>
  implements ICrudService<Review, ReviewDto, PatchReviewDto>
{
  constructor(
    apiFeaturesService: APIFeaturesService,
    @InjectRepository(Review)
    repository: Repository<Review>,
  ) {
    super(repository, apiFeaturesService);
  }
}
