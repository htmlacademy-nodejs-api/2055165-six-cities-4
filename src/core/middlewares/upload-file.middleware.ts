import { NextFunction, Request, Response } from 'express';
import mime from 'mime';
import multer, { diskStorage } from 'multer';
import { nanoid } from 'nanoid';

import { MiddlewareInterface } from './middleware.interface.js';

export class UploadFileMiddleware implements MiddlewareInterface {
  constructor(
    private uploadDirectory: string,
    private reqFieldName: string,
  ) {}

  public async execute(req: Request, res: Response, next: NextFunction): Promise<void> {
    const storage = diskStorage({
      destination: this.uploadDirectory,
      filename: (_req, file, callback) => {
        const extension = mime.extension(file.mimetype);
        const fileId = nanoid();
        callback(null, `${fileId}.${extension}`);
      }
    });

    const uploadSingleFileMiddleware = multer({storage})
      .single(this.reqFieldName);

    uploadSingleFileMiddleware(req, res, next);
  }
}
