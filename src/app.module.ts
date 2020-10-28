import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MulterModule } from '@nestjs/platform-express';
import { ProductsModule } from './products/products.module';
import { DatabaseModule } from './database/database.module';
import { databaseProviders } from './database/database.providers';

const multerModule = MulterModule.register({
  dest: './uploads',
});

@Module({
  imports: [DatabaseModule, MongooseModule, multerModule, ProductsModule],
  controllers: [],
  providers: [...databaseProviders],
})
export class AppModule {}
