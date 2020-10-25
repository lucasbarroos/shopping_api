import { Controller, Post, Put, Get, Body, Param } from '@nestjs/common';
import { productDTO } from './products.interface';

@Controller('products')
export class ProductsController {

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
