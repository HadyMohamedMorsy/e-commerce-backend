import { Body, Controller, Post, Put, Req } from "@nestjs/common";
import { BaseController } from "src/shared/base/base.controller";
import { Roles } from "src/shared/decorators/roles.decorator";
import { RelationOptions, SelectOptions } from "src/shared/interfaces/query.interface";
import { Book } from "./book.entity";
import { BookService } from "./book.service";
import { BookDto } from "./dtos/create.dto";
import { PatchBookDto } from "./dtos/patch.dto";

@Controller("books")
export class BookController
  extends BaseController<Book, BookDto, PatchBookDto>
  implements SelectOptions, RelationOptions
{
  constructor(protected readonly service: BookService) {
    super(service);
  }

  public selectOptions(): Record<string, boolean> {
    return {
      id: true,
      created_at: true,
      updated_at: true,
      title: true,
      description: true,
      price: true,
      svg: true,
      createdBy: true,
    };
  }

  public getRelationOptions(): Record<string, any> {
    return {
      createdBy: {
        id: true,
        firstName: true,
        lastName: true,
      },
    };
  }

  @Post("/store")
  @Roles("CEO", "TECH_SUPPORT", "STORE_MANAGER", "SUPER_ADMIN", "CONTENT_MANAGER", "SYSTEM_ADMIN")
  public create(@Body() create: BookDto, @Req() req: Request) {
    return this.service.create(
      {
        title: create.title,
        description: create.description,
        price: create.price,
        svg: create.svg,
        createdBy: req["createdBy"],
      },
      this.selectOptions(),
      this.getRelationOptions(),
    );
  }

  @Put("/update")
  @Roles("CEO", "TECH_SUPPORT", "STORE_MANAGER", "SUPER_ADMIN", "CONTENT_MANAGER", "SYSTEM_ADMIN")
  public async update(@Body() update: PatchBookDto, @Req() req: Request) {
    return await this.service.update(
      {
        id: update.id,
        title: update.title,
        description: update.description,
        price: update.price,
        svg: update.svg,
        createdBy: req["createdBy"],
      },
      this.selectOptions(),
      this.getRelationOptions(),
    );
  }
}
