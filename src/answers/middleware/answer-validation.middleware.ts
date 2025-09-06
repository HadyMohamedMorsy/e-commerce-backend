import { Injectable, NestMiddleware, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { NextFunction, Request, Response } from "express";
import { Repository } from "typeorm";
import { BookService } from "../../books/book.service";
import { Quiz } from "../../quiz/quiz.entity";

@Injectable()
export class AnswerValidationMiddleware implements NestMiddleware {
  constructor(
    @InjectRepository(Quiz)
    private readonly quizRepository: Repository<Quiz>,
    private readonly bookService: BookService,
  ) {}

  async use(req: Request, res: Response, next: NextFunction) {
    const { questionId, bookIds } = req.body;

    if (!questionId || !bookIds || !Array.isArray(bookIds) || bookIds.length === 0) {
      throw new NotFoundException("questionId and bookIds array are required");
    }

    try {
      // Find the question (quiz)
      const question = await this.quizRepository.findOne({
        where: { id: questionId },
      });

      if (!question) {
        throw new NotFoundException(`Question with ID ${questionId} not found`);
      }

      // Find the books using service
      const books = await this.bookService.findByIds(bookIds);

      if (!books || books.length === 0) {
        throw new NotFoundException(`No books found with the provided IDs`);
      }

      if (books.length !== bookIds.length) {
        const foundIds = books.map(book => book.id);
        const missingIds = bookIds.filter(id => !foundIds.includes(id));
        throw new NotFoundException(`Books with IDs ${missingIds.join(", ")} not found`);
      }

      // Attach to request object
      req["question"] = question;
      req["books"] = books;

      next();
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new NotFoundException("Error validating question and books");
    }
  }
}
