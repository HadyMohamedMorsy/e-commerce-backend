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
  public create(@Body() create: UserDto, @Req() req: Request) {
    return this.service.create({
      firstName: create.firstName,
      lastName: create.lastName,
      fullName: create.fullName,
      email: create.email,
      username: create.username,
      birthOfDate: create.birthOfDate,
      type: create.type,
      role: create.role,
      phoneNumber: create.phoneNumber,
      password: req["password"],
      createdBy: req["createdBy"],
    } as UserDto);
  }

  @Post("/update")
  public async update(@Body() update: PatchUserDto, @Req() req: Request) {
    return await this.service.update({
      id: update.id,
      firstName: update.firstName,
      lastName: update.lastName,
      fullName: update.fullName,
      email: update.email,
      username: update.username,
      birthOfDate: update.birthOfDate,
      type: update.type,
      role: update.role,
      phoneNumber: update.phoneNumber,
      password: req["password"],
      createdBy: req["createdBy"],
    });
  }

  @Delete("/delete")
  public delete(@Body() id: number) {
    return this.service.delete(id);
  }
}
