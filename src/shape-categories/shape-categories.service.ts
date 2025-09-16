import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { BaseService } from "src/shared/base/base";
import { APIFeaturesService } from "src/shared/filters/filter.service";
import { ICrudService } from "src/shared/interfaces/crud-service.interface";
import { Repository } from "typeorm";
import { CreateShapeCategoryDto } from "./dtos/create.dto";
import { GroupedShapeCategoryResponseDto } from "./dtos/grouped-response.dto";
import { PatchShapeCategoryDto } from "./dtos/patch.dto";
import { ShapeCategory } from "./shape-categories.entity";

@Injectable()
export class ShapeCategoryService
  extends BaseService<ShapeCategory, CreateShapeCategoryDto, PatchShapeCategoryDto>
  implements ICrudService<ShapeCategory, CreateShapeCategoryDto, PatchShapeCategoryDto>
{
  constructor(
    apiFeaturesService: APIFeaturesService,
    @InjectRepository(ShapeCategory)
    repository: Repository<ShapeCategory>,
  ) {
    super(repository, apiFeaturesService);
  }

  async getGroupedShapeCategories(): Promise<GroupedShapeCategoryResponseDto[]> {
    const shapeCategories = await this.repository.find({
      select: ["id", "type", "shapeType", "name"],
      order: {
        type: "ASC",
        shapeType: "ASC",
        name: "ASC",
      },
    });

    const groupedData: GroupedShapeCategoryResponseDto[] = [];
    const seen = new Set();

    for (const category of shapeCategories) {
      const key = `${category.type}-${category.shapeType}`;

      if (!seen.has(key)) {
        seen.add(key);

        // Find all names for this type and shapeType combination
        const items = shapeCategories
          .filter(cat => cat.type === category.type && cat.shapeType === category.shapeType)
          .map(cat => cat.name);

        groupedData.push({
          id: category.id,
          type: category.type,
          shapeType: category.shapeType,
          items: items,
        });
      }
    }

    return groupedData;
  }

  async getShapeCategoriesWithNameValue(): Promise<{ label: string; value: string }[]> {
    const shapeCategories = await this.repository.find({
      select: ["name"],
      order: {
        name: "ASC",
      },
    });

    return shapeCategories.map(category => ({
      label: category.name,
      value: category.name,
    }));
  }

  async findShapesByName(name: string) {
    const shapes = await this.repository.find({
      where: {
        name,
      },
      select: ["id", "name", "part", "shapeType", "type"],
    });
    return shapes[0];
  }
}
