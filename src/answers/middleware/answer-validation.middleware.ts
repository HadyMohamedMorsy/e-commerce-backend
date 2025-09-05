import { Injectable, NestMiddleware, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { NextFunction, Request, Response } from "express";
import { Repository } from "typeorm";
import { Book } from "../../books/book.entity";
import { Quiz } from "../../quiz/quiz.entity";

@Injectable()
export class AnswerValidationMiddleware implements NestMiddleware {
  constructor(
    @InjectRepository(Quiz)
    private readonly quizRepository: Repository<Quiz>,
    @InjectRepository(Book)
    private readonly bookRepository: Repository<Book>,
  ) {}

  async use(req: Request, res: Response, next: NextFunction) {
    const { questionId, bookId } = req.body;

    if (!questionId || !bookId) {
      throw new NotFoundException("questionId and bookId are required");
    }

    try {
      // Find the question (quiz)
      const question = await this.quizRepository.findOne({
        where: { id: questionId },
      });

      if (!question) {
        throw new NotFoundException(`Question with ID ${questionId} not found`);
      }

      // Find the book
      const book = await this.bookRepository.findOne({
        where: { id: bookId },
      });

      if (!book) {
        throw new NotFoundException(`Book with ID ${bookId} not found`);
      }

      // Attach to request object
      req["question"] = question;
      req["book"] = book;

      next();
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new NotFoundException("Error validating question and book");
    }
  }
}
