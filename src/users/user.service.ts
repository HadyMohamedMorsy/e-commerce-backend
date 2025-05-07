import { Injectable, UnauthorizedException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { BaseService } from "src/shared/base/base-crud";
import { APIFeaturesService } from "src/shared/filters/filter.service";
import { ICrudService } from "src/shared/interfaces/crud-service.interface";
import { ILike, Repository } from "typeorm";
import { UserDto } from "./dtos/create.dto";
import { PatchUserDto } from "./dtos/patch.dto";
import { User } from "./user.entity";
@Injectable()
export class UserService
  extends BaseService<User, UserDto, PatchUserDto>
  implements ICrudService<User, UserDto, PatchUserDto>
{
  constructor(
    apiFeaturesService: APIFeaturesService,
    @InjectRepository(User)
    repository: Repository<User>,
  ) {
    super(repository, apiFeaturesService);
  }

  public async findOneByEmail(email: string) {
    const user = await this.repository.findOne({ where: { email } });
    if (!user) {
      throw new UnauthorizedException(`${email} not found`);
    }
    return user;
  }

  public async searchUsers(query: string) {
    return this.repository.find({
      where: [
        { firstName: ILike(`%${query}%`) },
        { lastName: ILike(`%${query}%`) },
        { email: ILike(`%${query}%`) },
      ],
    });
  }
}
