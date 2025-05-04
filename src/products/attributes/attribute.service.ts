import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { BaseCrudService } from "src/shared/base/base-crud";
import { APIFeaturesService } from "src/shared/filters/filter.service";
import { ICrudService } from "src/shared/interfaces/crud-service.interface";
import { Repository } from "typeorm";
import { Attribute } from "./attribute.entity";
import { AttributeDto } from "./dtos/create.dto";
import { PatchAttributeDto } from "./dtos/patch.dto";

@Injectable()
export class AttributeService
  extends BaseCrudService<Attribute, AttributeDto, PatchAttributeDto>
  implements ICrudService<Attribute, AttributeDto, PatchAttributeDto>
{
  constructor(
    apiFeaturesService: APIFeaturesService,
    @InjectRepository(Attribute)
    repository: Repository<Attribute>,
  ) {
    super(repository, apiFeaturesService);
  }
}
