import { diskStorage } from 'multer';
import { v4 as uuid } from 'uuid';
import { extname } from 'path';
import { MulterOptions } from '@nestjs/platform-express/multer/interfaces/multer-options.interface';

export const multerOptions = {
  storage: diskStorage({
    destination: './uploads', // Directory for file uploads
    filename: (req, file, callback) => {
      const uniqueSuffix = `${uuid()}${extname(file.originalname)}`;
      callback(null, uniqueSuffix);
    },
  }),
  limits: {
    fileSize: 10 * 1024 * 1024, // Limit file size to 10MB
  },
  fileFilter: (req, file, callback) => {
    if (file.mimetype.match(/\/(jpg|jpeg|png|gif|pdf)$/)) {
      callback(null, true);
    } else {
      callback(new Error('Unsupported file type'), false);
    }
  },
};

export const getModuleSpecificMulterOptions = (moduleName: string): MulterOptions => ({
  storage: diskStorage({
    destination: `./uploads/${moduleName}`,
    filename: (req, file, callback) => {
      const uniqueSuffix = `${uuid()}${extname(file.originalname)}`;
      callback(null, uniqueSuffix);
    },
  }),
  fileFilter: (req, file, callback) => {
    if (file.mimetype.match(/\/(jpg|jpeg|png)$/)) {
      callback(null, true);
    } else {
      callback(new Error('Unsupported file type'), false);
    }
  },
});
