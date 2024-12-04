import { Injectable, UploadedFile } from '@nestjs/common';

@Injectable()
export class FileUploadService {
    uploadFile(@UploadedFile() file: Express.Multer.File): string {
        return file.path;
    }
}
