import { Controller } from '@nestjs/common';
import { Param, Inject, UseInterceptors, UploadedFile, HttpStatus, Post } from '@nestjs/common';
import {  FileInterceptor } from '@nestjs/platform-express';
import { Model } from 'mongoose';
import { diskStorage } from 'multer';
import { editFileName, imageFileFilter } from '../../utils/file_upload';
import { productInterface } from '../products/products.interface';

@Controller('avatars')
export class AvatarsController {
    constructor(
        @Inject('PRODUCT_MODEL')
        private productModel: Model<productInterface>
    ) { }

    @Post(':id')
    @UseInterceptors(FileInterceptor('image', {
        storage: diskStorage({
            destination: './uploads',
            filename: editFileName,
        }),
        fileFilter: imageFileFilter,
    }))
    async pictureUpload(@UploadedFile() image: any, @Param('id') id: string): Promise<any> {
        const product = await this.productModel.findById(id);
        console.log(product);
        if (!product) {
            return {
                status: HttpStatus.NOT_FOUND,
                message: 'Product not found!',
            };
        }

        if (!image) {
            return {
                status: HttpStatus.NOT_FOUND,
                message: 'Image not found!',
            };
        }

        return {
            status: HttpStatus.OK,
            message: 'Image uploaded successfully!',
        };
    }
}
