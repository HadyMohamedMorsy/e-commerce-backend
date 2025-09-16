import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { BaseService } from "src/shared/base/base";
import { APIFeaturesService } from "src/shared/filters/filter.service";
import { Repository } from "typeorm";
import { CreateShapeDto } from "./dtos/create-shape.dto";
import { PatchShapeDto } from "./dtos/patch-shape.dto";
import { Shape } from "./shapes.entity";

@Injectable()
export class ShapesService extends BaseService<Shape, CreateShapeDto, PatchShapeDto> {
  constructor(
    apiFeaturesService: APIFeaturesService,
    @InjectRepository(Shape)
    repository: Repository<Shape>,
  ) {
    super(repository, apiFeaturesService);
  }

  async getGroupedShapes() {
    const shapes = await this.repository.find({
      select: ["id", "name", "type", "shapeType", "colorCode", "image", "part"],
    });

    // Get unique shape types for bodyTypes
    const uniqueShapeTypes = [...new Set(shapes.map(shape => shape.shapeType))];

    // Create bodyTypes array
    const bodyTypes = uniqueShapeTypes.map(shapeType => ({
      id: shapeType,
      label: this.formatLabel(shapeType),
    }));

    // Group shapes by shapeType for bodyShapes
    const bodyShapes = {};
    uniqueShapeTypes.forEach(shapeType => {
      const shapesOfType = shapes.filter(shape => shape.shapeType === shapeType);

      // Get available parts for this shapeType (all unique parts shared across all shapes)
      const availableParts = [
        ...new Set(shapesOfType.map(shape => shape.part).filter(part => part)),
      ];

      // Get the type for this shapeType (take the first one since they should be the same)
      const typeForShapeType = shapesOfType[0]?.type || "";

      bodyShapes[shapeType] = [
        {
          type: typeForShapeType,
          availableParts, // Single array with all shared parts
        },
      ];
    });

    // Get unique colors for bodyColors
    const bodyColors = [...new Set(shapes.map(shape => shape.colorCode).filter(color => color))];

    // Get unique types for types array
    const types = [...new Set(shapes.map(shape => shape.type).filter(type => type))];

    return {
      bodyTypes,
      bodyShapes,
      bodyColors,
      types,
    };
  }

  private formatLabel(shapeType: string): string {
    return shapeType
      .split("_")
      .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(" ");
  }

  async getPartsByShapeAndPartType(shapeId: string, partType: string) {
    const shapes = await this.repository.find({
      where: {
        shapeType: shapeId,
        part: partType as any,
      },
      select: ["id", "name", "colorCode", `shapeType`, "image", "part", "type"],
    });

    return shapes.map(shape => ({
      id: shape.id.toString(),
      label: shape.name,
      colorCode: shape.colorCode,
      svg: this.removeSvgTags(shape.image),
      part: shape.part,
      type: shape.type,
      bodyType: shape.shapeType,
    }));
  }

  private removeSvgTags(svgString: string): string {
    if (!svgString) return "";

    // Remove opening and closing SVG tags
    return svgString
      .replace(/^<svg[^>]*>/, "")
      .replace(/<\/svg>$/, "")
      .trim();
  }
}
