import { Body, Controller, Delete, HttpCode, Post, Put, Req } from "@nestjs/common";
import { Roles } from "src/shared/decorators/roles.decorator";
import { RelationOptions, SelectOptions } from "src/shared/interfaces/query.interface";
import { UserDto } from "./dtos/create.dto";
import { PatchUserDto } from "./dtos/patch.dto";
import { UserService } from "./user.service";

@Controller("user")
export class UserController implements SelectOptions, RelationOptions {
  constructor(private readonly service: UserService) {}

  public selectOptions(): Record<string, boolean> {
    return {
      id: true,
      firstName: true,
      lastName: true,
      email: true,
      username: true,
      birthOfDate: true,
      type: true,
      role: true,
      phoneNumber: true,
      createdAt: true,
      updatedAt: true,
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

  @Post("/index")
  @Roles(
    "CEO",
    "TECH_SUPPORT",
    "STORE_MANAGER",
    "SUPER_ADMIN",
    "INVENTORY_MANAGER",
    "CONTENT_MANAGER",
    "SYSTEM_ADMIN",
  )
  @HttpCode(200)
  public index(@Body() filter: any) {
    return this.service.findAll(filter);
  }

  @Post("/store")
  @Roles("CEO", "TECH_SUPPORT", "STORE_MANAGER", "SUPER_ADMIN", "CONTENT_MANAGER", "SYSTEM_ADMIN")
  public create(@Body() create: UserDto, @Req() req: Request) {
    return this.service.create(
      {
        firstName: create.firstName,
        lastName: create.lastName,
        email: create.email,
        username: create.username,
        birthOfDate: create.birthOfDate,
        type: create.type,
        role: create.role,
        phoneNumber: create.phoneNumber,
        password: req["password"],
        createdBy: req["createdBy"],
      } as UserDto,
      this.selectOptions(),
      this.getRelationOptions(),
    );
  }

  @Put("/update")
  @Roles("CEO", "TECH_SUPPORT", "STORE_MANAGER", "SUPER_ADMIN", "CONTENT_MANAGER", "SYSTEM_ADMIN")
  public async update(@Body() update: PatchUserDto, @Req() req: Request) {
    const updateData: PatchUserDto = {
      id: update.id,
      firstName: update.firstName,
      lastName: update.lastName,
      email: update.email,
      username: update.username,
      birthOfDate: update.birthOfDate,
      type: update.type,
      role: update.role,
      phoneNumber: update.phoneNumber,
      createdBy: req["createdBy"],
    };
    if (req["password"]) updateData.password = req["password"];

    return await this.service.update(updateData, this.selectOptions(), this.getRelationOptions());
  }

  @Delete("/delete")
  @Roles("STORE_MANAGER", "SUPER_ADMIN", "CONTENT_MANAGER", "CEO", "SYSTEM_ADMIN")
  public delete(@Body() id: number) {
    return this.service.delete(id);
  }
}
