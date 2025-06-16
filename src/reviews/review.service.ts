import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { BaseService } from "src/shared/base/base";
import { APIFeaturesService } from "src/shared/filters/filter.service";
import { ICrudService } from "src/shared/interfaces/crud-service.interface";
import { Repository, SelectQueryBuilder } from "typeorm";
import { ReviewDto } from "./dtos/create.dto";
import { PatchReviewDto } from "./dtos/patch.dto";
import { Review } from "./review.entity";

@Injectable()
export class ReviewService
  extends BaseService<Review, ReviewDto, PatchReviewDto>
  implements ICrudService<Review, ReviewDto, PatchReviewDto>
{
  constructor(
    apiFeaturesService: APIFeaturesService,
    @InjectRepository(Review)
    repository: Repository<Review>,
  ) {
    super(repository, apiFeaturesService);
  }

  override queryRelationIndex(queryBuilder: SelectQueryBuilder<Review>) {
    queryBuilder.leftJoin("e.createdBy", "ec").addSelect(["ec.id", "ec.firstName", "ec.lastName"]);
    queryBuilder.leftJoin("e.product", "ep").addSelect(["ep.id", "ep.name"]);
  }
}
