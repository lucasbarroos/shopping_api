import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersController } from './users/users.controller';
import { ProductsController } from './products/products.controller';
import { ProductsModule } from './products/products.module';
import { productsProviders } from './products/products.providers';
import { DatabaseModule } from './database/database.module';
import { databaseProviders } from './database/database.providers';

@Module({
  imports: [DatabaseModule, MongooseModule, ProductsModule],
  controllers: [UsersController],
  providers: [...databaseProviders],
})
export class AppModule {}
