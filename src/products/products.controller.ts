import { Controller, Post, Put, Get, Body, Param, Inject } from '@nestjs/common';
import { Model } from 'mongoose';
import { productInterface } from './products.interface';
import { productDTO } from './products.dto';
@Controller('products')
export class ProductsController {
    constructor(
        @Inject('PRODUCT_MODEL')
        private productModel: Model<productInterface>
    ) { }

    @Post()
    async create(@Body() product: productDTO): Promise<productDTO> {
        const { name, brand, amount } = product;
        const productCreated = await this.productModel.create({ name, brand, amount });
        return productCreated;
    }

    @Put(':id')
    async update(@Param('id') id: string, @Body() product: productDTO): Promise<productDTO> {
        const { name, brand, amount, images } = product;
        const productUpdated = await this.productModel.findOneAndUpdate({
            _id: id,
        }, {
            name,
            brand,
            amount,
            images,
        }, {
            new: true,
        });
        return productUpdated;
    }

    @Get(':id')
    async findOne(@Param('id') id): Promise<productDTO> {
        const product = this.productModel.findById(id)
            .populate('images');
        return product;
    }

    @Get()
    async findAll(): Promise<Array<productDTO>> {
        const products = this.productModel.find();

        return products;
    }
}
