import { Controller, Get, Type } from '@nestjs/common';
import { Param, Inject, UseInterceptors, UploadedFile, HttpStatus, Post, Res } from '@nestjs/common';
import {  FileInterceptor } from '@nestjs/platform-express';
import { Model } from 'mongoose';
import { diskStorage } from 'multer';
import { editFileName, imageFileFilter } from '../../utils/file_upload';
import { avatarInterface } from './avatars.interface';
import { join } from 'path';
@Controller('avatars')
export class AvatarsController {
    constructor(
        @Inject('AVATAR_MODEL')
        private avatarModel: Model<avatarInterface>
    ) { }

    @Get()
    async show(): Promise<Array<avatarInterface>> {
        const avatars = await this.avatarModel.find();
        return avatars;
    }

    @Get(':id')
    async findById(@Param('id') id): Promise<avatarInterface> {
        const avatar = await this.avatarModel.findById(id);
        return avatar;
    }

    @Get(':id/download')
    async download(@Param('id') id, @Res() response): Promise<avatarInterface> {
        const avatar = await this.avatarModel.findById(id);
        const filePath = join(__dirname, '..', '..', '..', avatar.path);
        return response.download(filePath);
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
