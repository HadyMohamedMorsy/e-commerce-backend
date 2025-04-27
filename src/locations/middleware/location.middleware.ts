import { Injectable, NestMiddleware } from "@nestjs/common";
import { NextFunction, Request, Response } from "express";
import { LocationService } from "../location.service";

@Injectable()
export class ResolveLocationParentMiddleware implements NestMiddleware {
  constructor(private readonly locationService: LocationService) {}

  async use(req: Request, res: Response, next: NextFunction) {
    const { parentId } = req.body;
    req["parent"] = await this.resolveParent(parentId);
    next();
  }

  private async resolveParent(parentId?: number) {
    if (!parentId) return null;
    const parent = await this.locationService.findOne(parentId);
    return parent;
  }
}
