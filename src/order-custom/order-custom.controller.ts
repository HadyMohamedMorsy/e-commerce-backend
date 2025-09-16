import { Body, Controller, Patch, Post, Req, UploadedFiles, UseInterceptors } from "@nestjs/common";
import { AnyFilesInterceptor } from "@nestjs/platform-express";
import { diskStorage } from "multer";
import { extname } from "path";
import { BaseController } from "src/shared/base/base.controller";
import { Roles } from "src/shared/decorators/roles.decorator";
import { OrderStatus } from "src/shared/enum/global-enum";
import { RelationOptions, SelectOptions } from "src/shared/interfaces/query.interface";
import { OrderCustomDto } from "./dtos/create.dto";
import { PatchOrderCustomDto } from "./dtos/patch.dto";
import { OrderCustom } from "./order-custom.entity";
import { OrderCustomService } from "./order-custom.service";

@Controller("custom-orders")
export class OrderCustomController
  extends BaseController<OrderCustom, OrderCustomDto, PatchOrderCustomDto>
  implements SelectOptions, RelationOptions
{
  constructor(protected readonly service: OrderCustomService) {
    super(service);
  }

  public selectOptions(): Record<string, boolean> {
    return {
      id: true,
      status: true,
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

  @Post("/store")
  @Roles("CEO", "TECH_SUPPORT", "STORE_MANAGER", "SUPER_ADMIN", "CONTENT_MANAGER", "SYSTEM_ADMIN")
  @UseInterceptors(
    AnyFilesInterceptor({
      limits: {
        fileSize: 31457280, // 30MB
        files: 10,
      },
      fileFilter: (req, file, cb) => {
        const allowedMimeTypes = ["image/jpeg", "image/png", "image/jpg", "image/webp"];
        if (allowedMimeTypes.includes(file.mimetype)) {
          cb(null, true);
        } else {
          cb(new Error("Invalid file type. Only images are allowed."), false);
        }
      },
      storage: diskStorage({
        destination: "./dist/uploads",
        filename: (req, file, cb) => {
          const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
          const ext = extname(file.originalname);
          const fieldName = file.fieldname || "image";
          cb(null, `${fieldName}-${uniqueSuffix}${ext}`);
        },
      }),
    }),
  )
  public async createWithImages(
    @Body() create: OrderCustomDto,
    @UploadedFiles() files: Express.Multer.File[],
    @Req() req: Request,
  ) {
    // Process uploaded files
    const imagePaths = files?.map(file => `uploads/${file.filename}`) || [];
    return this.service.create(
      {
        images: imagePaths,
        couponId: create.couponId,
        paperTypeId: create.paperTypeId,
        booksIds: create.booksIds,
        paymentMethodId: create.paymentMethodId,
        createdBy: req["createdBy"],
      },
      this.selectOptions(),
      this.getRelationOptions(),
    );
  }

  @Patch("/change-order-status")
  @Roles("CEO", "TECH_SUPPORT", "STORE_MANAGER", "SUPER_ADMIN", "CONTENT_MANAGER", "SYSTEM_ADMIN")
  public changeOrderStatus(@Body() update: { id: number; status: OrderStatus }) {
    return this.service.changeStatus(update.id, update.status, "status", {
      id: true,
      status: true,
    });
  }
}
