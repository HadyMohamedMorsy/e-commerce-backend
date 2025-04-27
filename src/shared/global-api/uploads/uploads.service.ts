import { Injectable } from "@nestjs/common";

@Injectable()
export class UploadsService {
  handleFilesUpload(files: Array<Express.Multer.File>) {
    return files.map(file => ({
      name: `uploads/${file.filename}`,
    }));
  }
}
