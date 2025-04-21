import { Body, Controller, Delete, HttpCode, Post, Req } from "@nestjs/common";
import { UserDto } from "./dtos/create.dto";
import { PatchUserDto } from "./dtos/patch.dto";
import { UserService } from "./user.service";

@Controller("user")
export class UserController {
  constructor(private readonly service: UserService) {}

  @Post("/index")
  @HttpCode(200)
  public index(@Body() filter: any) {
    return this.service.findAll(filter);
  }

  @Post("/store")
  public create(@Body() createDto: UserDto, @Req() req: Request) {
    return this.service.create({
      ...createDto,
      password: req["password"],
      createdBy: req["createdBy"],
    });
  }

  @Post("/update")
  public async update(@Body() update: PatchUserDto, @Req() req: Request) {
    return await this.service.update({
      ...update,
      password: req["password"],
      createdBy: req["createdBy"],
    });
  }

  @Delete("/delete")
  public delete(@Body() id: number) {
    return this.service.delete(id);
  }
}
