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
      // Pagination parameters
      const page = body.page || 1;
      const limit = body.limit || 10;
      const skip = (page - 1) * limit;

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
      }

      let books = [];
      let totalCount = 0;

      if (answerIds.length > 0) {
        // Get books that have answers with these answerIds
        const answers = await this.answerRepository.find({
          where: { id: In(answerIds) },
          relations: ["books"],
        });

        const bookIds = answers
          .flatMap(answer => answer.books?.map(book => book.id) || [])
          .filter(id => id !== null);

        if (bookIds.length > 0) {
          // Get total count
          totalCount = await this.repository.count({
            where: { id: In(bookIds) },
          });

          // Get paginated results
          books = await this.repository.find({
            where: { id: In(bookIds), type: "cover" },
            select: ["id", "title", "type", "price", "svg"],
            skip,
            take: limit,
          });
        }
      } else {
        // If no answerIds, get all books
        totalCount = await this.repository.count();
        books = await this.repository.find({
          select: ["id", "title", "type", "price", "svg"],
          skip,
          take: limit,
        });
      }

      // Calculate pagination info
      const totalPages = Math.ceil(totalCount / limit);
      const hasNextPage = page < totalPages;
      const hasPrevPage = page > 1;

      // Prepare response data
      const responseData: any = {
        success: true,
        data: books,
        message: "Books found and processed successfully",
        pagination: {
          currentPage: page,
          totalPages,
          totalCount,
          limit,
          hasNextPage,
          hasPrevPage,
        },
        timestamp: new Date().toISOString(),
      };

      return responseData;
    } catch (error) {
      this.logger.error("Error in book finder:", error);
      throw error;
    }
  }

  async pages(body: FinderRequest) {
    try {
      // Pagination parameters
      const page = body.page || 1;
      const limit = body.limit || 10;
      const skip = (page - 1) * limit;

      // Step 1: Filter books based on answers (answerId only)
      const answerIds =
        body.answers?.filter(answer => answer.answerId)?.map(answer => answer.answerId) || [];

      // Step 2: Filter shapes based on characterSelection
      const characterSelection = body.characterSelection || [];

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
      }

      let books = [];
      let totalCount = 0;

      if (answerIds.length > 0) {
        // Get books that have answers with these answerIds
        const answers = await this.answerRepository.find({
          where: { id: In(answerIds) },
          relations: ["books"],
        });

        const bookIds = answers
          .flatMap(answer => answer.books?.map(book => book.id) || [])
          .filter(id => id !== null);

        if (bookIds.length > 0) {
          // Get total count for pages only
          totalCount = await this.repository.count({
            where: {
              id: In(bookIds),
              type: "page",
            },
          });

          // Get paginated results for pages only
          books = await this.repository.find({
            where: {
              id: In(bookIds),
              type: "page",
            },
            select: ["id", "title", "type", "price", "svg"],
            skip,
            take: limit,
          });
        }
      } else {
        // If no answerIds, get all pages
        totalCount = await this.repository.count({
          where: { type: "page" },
        });
        books = await this.repository.find({
          where: { type: "page" },
          select: ["id", "title", "type", "price", "svg"],
          skip,
          take: limit,
        });
      }

      // Calculate pagination info
      const totalPages = Math.ceil(totalCount / limit);
      const hasNextPage = page < totalPages;
      const hasPrevPage = page > 1;

      // Prepare response data
      const responseData: any = {
        success: true,
        data: books,
        message: "Pages found and processed successfully",
        pagination: {
          currentPage: page,
          totalPages,
          totalCount,
          limit,
          hasNextPage,
          hasPrevPage,
        },
        timestamp: new Date().toISOString(),
      };

      return responseData;
    } catch (error) {
      this.logger.error("Error in book pages:", error);
      throw error;
    }
  }
}
