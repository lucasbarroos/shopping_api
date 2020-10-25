import { Controller, Post, Put, Get, Body, Param, Injectable, Inject } from '@nestjs/common';
import { Model } from 'mongoose';
import { productInterface } from './products.interface';
import { productDTO } from './products.dto';
@Controller('products')
export class ProductsController {
    constructor(
        @Inject('PRODUCT_MODEL')
        private productModel: Model<productInterface>
    ) {}

    @Post()
    create(@Body() product: productDTO): String {
        const { name, brand, amount } = product;

        return `Product ${name} (${brand}) created`;
    }

    @Put(':id')
    update(@Param('id') id: string, @Body() product: productDTO): String {
        const { name, brand, amount } = product;

        return `Product ${name} (${brand}) updated`;
    }

    @Get(':id')
    findOne(@Param('id') id): String {
        return `You are searching by ${id}`;
    }

    @Get()
    findAll(): Array<String> {
        return ['Nike', 'Adidas'];
    }
}
