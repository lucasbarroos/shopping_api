import { Module } from '@nestjs/common';
import { UsersController } from './users/users.controller';
import { ProductsController } from './products/products.controller';

@Module({
  imports: [],
  controllers: [UsersController, ProductsController],
})
export class AppModule {}
