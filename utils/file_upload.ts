import { extname } from 'path';
import { HttpException, HttpStatus } from '@nestjs/common';

// Allow only images
export const imageFileFilter = (req: any, file: { originalname: string; }, callback: (arg0: HttpException, arg1: boolean) => void) => {
  if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
    return callback(
      new HttpException(
        'Only image files are allowed!',
        HttpStatus.BAD_REQUEST,
      ),
      false,
    );
  }
  callback(null, true);
};

export const editFileName = (req: any, file: { originalname: string; }, callback: (arg0: any, arg1: string) => void) => {
  const name = file.originalname.split('.')[0];
  const fileExtName = extname(file.originalname);
  const randomName = Array(4)
    .fill(null)
    .map(() => Math.round(Math.random() * 10).toString(10))
    .join('');
  callback(null, `${name}${randomName}${fileExtName}`);
};
