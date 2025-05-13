import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { BaseService } from "src/shared/base/base";
import { APIFeaturesService } from "src/shared/filters/filter.service";
import { Repository } from "typeorm";
import { CreateShapeDto } from "./dtos/create-shape.dto";
import { PatchShapeDto } from "./dtos/patch-shape.dto";
import { Shape } from "./shapes.entity";

@Injectable()
export class ShapesService extends BaseService<Shape, CreateShapeDto, PatchShapeDto> {
  constructor(
    apiFeaturesService: APIFeaturesService,
    @InjectRepository(Shape)
    repository: Repository<Shape>,
  ) {
    super(repository, apiFeaturesService);
  }
}
