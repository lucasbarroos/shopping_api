import { Controller, Get, Type } from '@nestjs/common';
import { Param, Inject, UseInterceptors, UploadedFile, HttpStatus, Post, Res } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Model } from 'mongoose';
import { diskStorage } from 'multer';
import { editFileName, imageFileFilter } from '../../utils/file_upload';
import multer from '../../utils/multer';
import { imageInterface } from './images.interface';
import { join } from 'path';
@Controller('images')
export class ImagesController {
    constructor(
        @Inject('AVATAR_MODEL')
        private imageModel: Model<imageInterface>
    ) { }

    @Get()
    async show(): Promise<Array<imageInterface>> {
        const images = await this.imageModel.find();
        return images;
    }

    @Get(':id')
    async findById(@Param('id') id): Promise<imageInterface> {
        const image = await this.imageModel.findById(id);
        return image;
    }

    @Get(':id/download')
    async download(@Param('id') id, @Res() response): Promise<imageInterface> {
        const image = await this.imageModel.findById(id);
        const filePath = join(__dirname, '..', '..', '..', image.path);
        return response.download(filePath);
    }

    @Post()
    @UseInterceptors(FileInterceptor('imageReceived', {
        storage: diskStorage({
            destination: './uploads',
            filename: editFileName,
        }),
        fileFilter: imageFileFilter,
    }))
    async create(@UploadedFile() imageReceived: any): Promise<any> {
        const { originalname, filename, mimetype, path, size } = imageReceived;
        const obj = {
            originalName: originalname,
            filename,
            type: mimetype,
            path,
            size,
        };

        const image = await this.imageModel.create(obj);

        return {
            status: HttpStatus.OK,
            message: 'Image uploaded successfully!',
            image,
        };
    }
}
