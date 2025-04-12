import { ArgumentsHost, Catch, ExceptionFilter } from "@nestjs/common";
import { Response } from "express";
import { QueryFailedError } from "typeorm";

@Catch(QueryFailedError)
export class DatabaseExceptionFilter implements ExceptionFilter {
  catch(exception: QueryFailedError, host: ArgumentsHost) {
    const response = host.switchToHttp().getResponse<Response>();

    // Return a generic error response if no specific constraint is found
    return response.status(500).json({
      message: "Unable to process your request at the moment, please try again later.",
      description: `Error connecting to the database: ${exception.message}`,
    });
  }
}
