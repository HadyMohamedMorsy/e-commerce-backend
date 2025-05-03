import { Injectable, NestMiddleware } from "@nestjs/common";
import { NextFunction, Request, Response } from "express";

@Injectable()
export class ShipmentRelationsMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const body = req.body;

    // If the request is for finding shipments
    if (req.method === "POST" && req.path === "/shipment/index") {
      // Add default relations that should always be included
      if (!body.relations) {
        body.relations = [];
      }

      // Add order relation if not already included
      if (!body.relations.includes("order")) {
        body.relations.push("order");
      }

      // Add user relation if not already included
      if (!body.relations.includes("user")) {
        body.relations.push("user");
      }

      // Add address relation if not already included
      if (!body.relations.includes("address")) {
        body.relations.push("address");
      }
    }

    next();
  }
}
