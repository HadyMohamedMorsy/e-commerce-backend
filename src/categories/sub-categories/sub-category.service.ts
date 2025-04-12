import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { BaseCrudService } from "src/shared/base/base-crud";
import { APIFeaturesService } from "src/shared/filters/filter.service";
import { ICrudService } from "src/shared/interfaces/crud-service.interface";
import { Repository } from "typeorm";
import { SubCategoryDto } from "./dtos/create.dto";
import { PatchSubCategoryDto } from "./dtos/patch.dto";
import { SubCategory } from "./sub-category.entity";

@Injectable()
export class SubCategoryService
  extends BaseCrudService<SubCategory, SubCategoryDto, PatchSubCategoryDto>
  implements ICrudService<SubCategory, SubCategoryDto, PatchSubCategoryDto>
{
  constructor(
    apiFeaturesService: APIFeaturesService,
    @InjectRepository(SubCategory)
    repository: Repository<SubCategory>,
  ) {
    super(repository, apiFeaturesService);
  }
}
