import { Injectable, NestMiddleware } from "@nestjs/common";
import { NextFunction, Request, Response } from "express";
import { LocationService } from "src/locations/location.service";

@Injectable()
export class ShipmentLocationMiddleware implements NestMiddleware {
  constructor(private readonly locationService: LocationService) {}

  async use(req: Request, res: Response, next: NextFunction) {
    const { locationId } = req.body;
    req["location"] = await this.getLocation(locationId);
    next();
  }

  private async getLocation(locationId?: number) {
    if (!locationId) return null;
    const location = await this.locationService.findOne(locationId);
    return location;
  }
}
