// list.service.ts
import { Injectable } from "@nestjs/common";
import { getFaqList, getRoleList } from "../utilties/get-flobal-list-from-enum.utils";

@Injectable()
export class ListService {
  private lists = {
    roles: getRoleList(),
    faq: getFaqList(),
  };

  getListsBySlug(slug: string) {
    switch (slug) {
      case "user":
        return {
          roles: this.lists.roles,
        };
      case "faq":
        return {
          faq: this.lists.faq,
        };
      default:
        throw new Error(`Slug "${slug}" not supported`);
    }
  }
}
