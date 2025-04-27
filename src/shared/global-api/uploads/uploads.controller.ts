import {
  Controller,
  HttpStatus,
  ParseFilePipeBuilder,
  Post,
  UploadedFiles, // Changed from UploadedFile
  UseInterceptors,
} from "@nestjs/common";
import { FilesInterceptor } from "@nestjs/platform-express";
import { UploadsService } from "./uploads.service";

@Controller("global-media")
export class UploadsController {
  constructor(private readonly fileUploadService: UploadsService) {}

  @Post("upload")
  @UseInterceptors(FilesInterceptor("files[]"))
  uploadFiles(
    @UploadedFiles(
      new ParseFilePipeBuilder()
        .addFileTypeValidator({
          fileType: /^(image\/jpe?g|image\/png|application\/pdf)$/i,
        })
        .addMaxSizeValidator({
          maxSize: 307200,
        })
        .build({
          errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
        }),
    )
    files: Express.Multer.File[],
  ) {
    return this.fileUploadService.handleFilesUpload(files);
  }
}
