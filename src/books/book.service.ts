import { Injectable, Logger } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { BaseService } from "src/shared/base/base";
import { APIFeaturesService } from "src/shared/filters/filter.service";
import { ICrudService } from "src/shared/interfaces/crud-service.interface";
import { In, Repository } from "typeorm";
import { Answer } from "../answers/answer.entity";
import { Shape } from "../shapes/shapes.entity";
import { Book } from "./book.entity";
import { BookDto } from "./dtos/create.dto";
import { FinderRequest } from "./dtos/finder.dto";
import { PatchBookDto } from "./dtos/patch.dto";

@Injectable()
export class BookService
  extends BaseService<Book, BookDto, PatchBookDto>
  implements ICrudService<Book, BookDto, PatchBookDto>
{
  private readonly logger = new Logger(BookService.name);

  constructor(
    apiFeaturesService: APIFeaturesService,
    @InjectRepository(Book)
    repository: Repository<Book>,
    @InjectRepository(Answer)
    private answerRepository: Repository<Answer>,
    @InjectRepository(Shape)
    private shapeRepository: Repository<Shape>,
  ) {
    super(repository, apiFeaturesService);
  }

  async getBooksWithIdAndTitle(): Promise<{ value: number; label: string }[]> {
    const books = await this.repository.find({
      select: ["id", "title"],
      order: {
        title: "ASC",
      },
    });

    return books.map(book => ({
      value: book.id,
      label: book.title,
    }));
  }

  async finder(body: FinderRequest) {
    try {
      // Step 1: Filter books based on answers (answerId only)
      const answerIds =
        body.answers?.filter(answer => answer.answerId)?.map(answer => answer.answerId) || [];

      // Step 2: Filter shapes based on characterSelection
      const characterSelection = body.characterSelection || [];
      // let filteredShapes = [];

      if (characterSelection.length > 0) {
        const allBodyTypes = characterSelection.flatMap(char => char.bodyType || []);
        const allCharacters = characterSelection.map(char => char.character);
        const allColors = characterSelection.flatMap(char => char.colorsCode || []);
        const allLabels = characterSelection.flatMap(char => char.body?.map(b => b.label) || []);

        const query = this.shapeRepository.createQueryBuilder("shape");

        const conditions = [];
        const parameters = {};

        if (allBodyTypes.length > 0) {
          conditions.push("shape.shapeType IN (:...bodyTypes)");
          parameters["bodyTypes"] = allBodyTypes;
        }

        if (allCharacters.length > 0) {
          conditions.push("shape.type IN (:...characters)");
          parameters["characters"] = allCharacters;
        }

        if (allColors.length > 0) {
          conditions.push("shape.colorCode IN (:...colors)");
          parameters["colors"] = allColors;
        }

        if (allLabels.length > 0) {
          conditions.push("shape.name IN (:...labels)");
          parameters["labels"] = allLabels;
        }

        if (conditions.length > 0) {
          query.where(conditions.join(" OR "), parameters);
        }

        // filteredShapes = await query
        //   .select([
        //     "shape.id",
        //     "shape.name",
        //     "shape.type",
        //     "shape.shapeType",
        //     "shape.colorCode",
        //     "shape.image",
        //   ])
        //   .getMany();
      }

      let books = [];
      if (answerIds.length > 0) {
        // Get books that have answers with these answerIds
        const answers = await this.answerRepository.find({
          where: { id: In(answerIds) },
          relations: ["book"],
        });

        const bookIds = answers.map(answer => answer.book?.id).filter(id => id !== null);

        if (bookIds.length > 0) {
          books = await this.repository.find({
            where: { id: In(bookIds) },
            select: ["id", "title", "type", "price", "svg"],
          });
        }
      } else {
        // If no answerIds, get all books
        books = await this.repository.find({
          select: ["id", "title", "type", "price", "svg"],
        });
      }

      // Prepare response data
      const responseData: any = {
        success: true,
        data: books,
        message: "Books found and processed successfully",
        total: books.length,
        timestamp: new Date().toISOString(),
      };

      return responseData;
    } catch (error) {
      this.logger.error("Error in book finder:", error);
      throw error;
    }
  }
}
