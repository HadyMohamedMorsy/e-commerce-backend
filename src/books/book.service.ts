import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { BaseService } from "src/shared/base/base";
import { APIFeaturesService } from "src/shared/filters/filter.service";
import { ICrudService } from "src/shared/interfaces/crud-service.interface";
import { Repository } from "typeorm";
import { Book } from "./book.entity";
import { BookDto } from "./dtos/create.dto";
import { PatchBookDto } from "./dtos/patch.dto";

@Injectable()
export class BookService
  extends BaseService<Book, BookDto, PatchBookDto>
  implements ICrudService<Book, BookDto, PatchBookDto>
{
  constructor(
    apiFeaturesService: APIFeaturesService,
    @InjectRepository(Book)
    repository: Repository<Book>,
  ) {
    super(repository, apiFeaturesService);
  }
}
