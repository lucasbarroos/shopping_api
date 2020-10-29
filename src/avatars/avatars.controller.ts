import { Controller, Get, Type } from '@nestjs/common';
import { Param, Inject, UseInterceptors, UploadedFile, HttpStatus, Post } from '@nestjs/common';
import {  FileInterceptor } from '@nestjs/platform-express';
import { Model, Types } from 'mongoose';
import { diskStorage } from 'multer';
import { editFileName, imageFileFilter } from '../../utils/file_upload';
import { avatarInterface } from './avatars.interface';
import { productInterface } from '../products/products.interface';

@Controller('avatars')
export class AvatarsController {
    constructor(
        @Inject('AVATAR_MODEL')
        private avatarModel: Model<avatarInterface>,
        @Inject('PRODUCT_MODEL')
        private productModel: Model<productInterface>
    ) { }

    @Get()
    async show(): Promise<Array<avatarInterface>> {
        const avatars = this.avatarModel.find();

        return avatars;
    }

    @Get(':id')
    async findById(@Param('id') id): Promise<avatarInterface> {
        const avatar = await this.avatarModel.findById(id);
        return avatar;
    }

    @Post()
    @UseInterceptors(FileInterceptor('image', {
        storage: diskStorage({
            destination: './uploads',
            filename: editFileName,
        }),
        fileFilter: imageFileFilter,
    }))
    async create(@UploadedFile() image: any): Promise<any> {
        const { originalname, filename, mimetype, path, size  } = image;
        const obj = {
            originalName: originalname, 
            filename,
            type: mimetype,
            path,
            size,
        };

        const avatar = await this.avatarModel.create(obj);

        return {
            status: HttpStatus.OK,
            message: 'Image uploaded successfully!',
            avatar,
        };
    }
}
