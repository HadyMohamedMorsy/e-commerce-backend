import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { BaseService } from "src/shared/base/base";
import { APIFeaturesService } from "src/shared/filters/filter.service";
import { ICrudService } from "src/shared/interfaces/crud-service.interface";
import { Repository } from "typeorm";
import { CreateSpecificationDto } from "./dtos/create-specification.dto";
import { UpdateSpecificationDto } from "./dtos/update-specification.dto";
import { Specification } from "./specification.entity";

@Injectable()
export class SpecificationService
  extends BaseService<Specification, CreateSpecificationDto, UpdateSpecificationDto>
  implements ICrudService<Specification, CreateSpecificationDto, UpdateSpecificationDto>
{
  constructor(
    apiFeaturesService: APIFeaturesService,
    @InjectRepository(Specification)
    repository: Repository<Specification>,
  ) {
    super(repository, apiFeaturesService);
  }
}
