import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { BaseService } from "src/shared/base/base";
import { APIFeaturesService } from "src/shared/filters/filter.service";
import { ICrudService } from "src/shared/interfaces/crud-service.interface";
import { Repository } from "typeorm";
import { CreateShapeCategoryDto } from "./dtos/create.dto";
import { PatchShapeCategoryDto } from "./dtos/patch.dto";
import { ShapeCategory } from "./shape-categories.entity";

@Injectable()
export class ShapeCategoryService
  extends BaseService<ShapeCategory, CreateShapeCategoryDto, PatchShapeCategoryDto>
  implements ICrudService<ShapeCategory, CreateShapeCategoryDto, PatchShapeCategoryDto>
{
  constructor(
    apiFeaturesService: APIFeaturesService,
    @InjectRepository(ShapeCategory)
    repository: Repository<ShapeCategory>,
  ) {
    super(repository, apiFeaturesService);
  }
}
