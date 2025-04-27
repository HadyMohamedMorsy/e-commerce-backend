import { HttpException, HttpStatus, Injectable, NestMiddleware } from "@nestjs/common";
import { NextFunction, Request, Response } from "express";
import { LocationService } from "src/locations/location.service";

@Injectable()
export class LocationResolutionMiddleware implements NestMiddleware {
  constructor(private readonly locationService: LocationService) {}

  async use(req: Request, res: Response, next: NextFunction) {
    try {
      const [country, region, city, area] = await Promise.all([
        this.resolveLocation(req.body.countryId),
        this.resolveLocation(req.body.regionId),
        this.resolveLocation(req.body.cityId),
        this.resolveLocation(req.body.areaId),
      ]);

      req["country"] = country;
      req["region"] = region;
      req["city"] = city;
      req["area"] = area;

      next();
    } catch (error) {
      throw new HttpException(
        error.message || "Location resolution failed",
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  private async resolveLocation(id?: number) {
    if (!id) return null;

    const location = await this.locationService.findOne(id);

    if (!location) {
      throw new Error(`Location with ID ${id} not found`);
    }

    return location;
  }
}
