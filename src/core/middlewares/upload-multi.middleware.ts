import {mkdir, access, readdir, unlink} from 'node:fs/promises';
import path from 'node:path';

import { NextFunction, Request, Response } from 'express';
import multer, { diskStorage } from 'multer';
import { nanoid } from 'nanoid';
import { StatusCodes } from 'http-status-codes';

import { MiddlewareInterface } from './middleware.interface.js';
import HttpError from '../errors/http-error.js';

export class UploadMultiMiddleware implements MiddlewareInterface {
  constructor(
    private uploadDirectory: string,
    private reqFieldName: string[],
  ) {}

  public async execute(req: Request, res: Response, next: NextFunction): Promise<void> {
    const {offerId} = req.params;
    console.log('from upload req.files: ', req.files);

    const allowedExtensions = ['jpg', 'jpeg', 'png'];

    const previewPath = path.join(
      this.uploadDirectory,
      `${res.locals.user.id}`,
      `${path.join('offers', `${offerId}`)}`,
      `${this.reqFieldName[0]}`
    );

    const imagesPath = path.join(
      this.uploadDirectory,
      `${res.locals.user.id}`,
      `${path.join('offers', `${offerId}`)}`,
      `${this.reqFieldName[1]}`
    );

    await access(previewPath).catch(async () => {
      await mkdir(previewPath, { recursive: true });
    });

    await access(imagesPath).catch(async () => {
      await mkdir(imagesPath, { recursive: true });
    });

    const storage = diskStorage({
      destination: async (_request, file, cb) => {
        if (file.fieldname === 'preview') {
          for (const fileName of await readdir(previewPath)) {
            await unlink(path.join(previewPath, fileName));
          }

          return cb(null, previewPath);
        } else {
          const imagesList = await readdir(imagesPath);
          if (imagesList.length === 6) {
            for (const fileName of imagesList) {
              await unlink(path.join(imagesPath, fileName));
            }
          }

          return cb(null, imagesPath);
        }
      },
      filename: (_request, file, callback) => {
        const extension = file.originalname.split('.').pop();
        if (!extension || !allowedExtensions.includes(extension)) {
          return next(new HttpError(StatusCodes.BAD_REQUEST, 'incorrect file extension', 'File validation'));
        }
        const fileId = nanoid();
        callback(null, `${fileId}.${extension}`);
      }
    });

    const uploadMultipleFilesMiddleware = multer({storage}).fields(
      [
        { name: 'preview', maxCount: 1},
        { name: 'images', maxCount: 6}
      ]
    );

    uploadMultipleFilesMiddleware(req, res, next);
  }
}
