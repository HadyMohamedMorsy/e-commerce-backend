import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { BaseService } from "src/shared/base/base";
import { APIFeaturesService } from "src/shared/filters/filter.service";
import { ICrudService } from "src/shared/interfaces/crud-service.interface";
import { Repository, SelectQueryBuilder } from "typeorm";
import { Answer } from "./answer.entity";
import { AnswerDto } from "./dtos/create.dto";
import { PatchAnswerDto } from "./dtos/patch.dto";

@Injectable()
export class AnswerService
  extends BaseService<Answer, AnswerDto, PatchAnswerDto>
  implements ICrudService<Answer, AnswerDto, PatchAnswerDto>
{
  constructor(
    apiFeaturesService: APIFeaturesService,
    @InjectRepository(Answer)
    repository: Repository<Answer>,
  ) {
    super(repository, apiFeaturesService);
  }

  override queryRelationIndex(queryBuilder?: SelectQueryBuilder<any>, filteredRecord?: any) {
    super.queryRelationIndex(queryBuilder, filteredRecord);
    queryBuilder.leftJoinAndSelect("e.quiz", "quiz");
    queryBuilder.leftJoinAndSelect("e.books", "books");
  }

  override async create(
    createData: AnswerDto,
    selectOptions?: Record<string, boolean>,
    relationOptions?: Record<string, any>,
  ) {
    const { books, ...answerData } = createData;

    // Create answer with books - TypeORM handles ManyToMany automatically
    const answer = this.repository.create({
      ...answerData,
      books: books || [],
    });

    const savedAnswer = await this.repository.save(answer);

    if (selectOptions || relationOptions) {
      return this.findOne(savedAnswer.id, selectOptions, relationOptions);
    }

    return savedAnswer;
  }

  override async update(
    updateData: Partial<AnswerDto> & { id: number },
    selectOptions?: Record<string, boolean>,
    relationOptions?: Record<string, any>,
  ) {
    const { books, ...answerData } = updateData;
    const { id } = updateData;

    if (!id) {
      throw new Error("ID is required for update");
    }

    // Find existing answer with books
    const answer = await this.repository.findOne({
      where: { id },
      relations: ["books"],
    });

    if (!answer) {
      throw new Error("Answer not found");
    }

    // Use Object.assign for ManyToMany relations
    Object.assign(answer, answerData);

    // Update books if provided
    if (books !== undefined) {
      answer.books = books;
    }

    const savedAnswer = await this.repository.save(answer);

    if (selectOptions || relationOptions) {
      return this.findOne(savedAnswer.id, selectOptions, relationOptions);
    }

    return savedAnswer;
  }
}
