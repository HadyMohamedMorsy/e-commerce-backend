import { Injectable } from "@nestjs/common";
import { UserService } from "src/users/user.service";

export enum SearchType {
  USER = "user",
}

interface SearchResult {
  label: string;
  value: number;
}

@Injectable()
export class SearchService {
  constructor(private readonly usersService: UserService) {}

  async search(type: SearchType, query: string): Promise<SearchResult[]> {
    switch (type) {
      case SearchType.USER:
        const users = await this.usersService.searchUsers(query);
        return users.map(user => ({
          label: `${user.firstName} ${user.lastName}`,
          value: user.id,
        }));
      default:
        throw new Error(`Invalid search type: ${type}`);
    }
  }
}
