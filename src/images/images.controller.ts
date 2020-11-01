import { Controller, Get } from '@nestjs/common';
import { Param, Inject, UseInterceptors, UploadedFile, HttpStatus, Post, Req, Res } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Model } from 'mongoose';
import { imageInterface } from './images.interface';
import multerConfig from '../../utils/multer';
require("dotenv").config();

@Controller('images')
export class ImagesController {
    constructor(
        @Inject('AVATAR_MODEL')
        private imageModel: Model<imageInterface>,
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

    @Post()
    @UseInterceptors(FileInterceptor('file', multerConfig))
    async create(@UploadedFile() file): Promise<any> {
        const { originalname, key, size, location, mimetype } = file;
        const image = await this.imageModel.create({
            originalName: originalname,
            filename: key,
            size,
            url: location,
            type: mimetype,
        });

        return {
            status: HttpStatus.OK,
            message: 'Image uploaded successfully!',
            image,
        };
    }
}
