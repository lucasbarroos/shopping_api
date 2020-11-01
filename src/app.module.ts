import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express'
import { MongooseModule } from '@nestjs/mongoose';
import { ProductsModule } from './products/products.module';
import { DatabaseModule } from './database/database.module';
import { databaseProviders } from './database/database.providers';
import { ImagesModule } from './images/images.module';
import multerConfig from '../utils/multer';
import multer from '../utils/multer';

const configMulter = MulterModule.registerAsync({
  useFactory: () => (multerConfig),
});

@Module({
  imports: [DatabaseModule, configMulter, MongooseModule, ProductsModule, ImagesModule],
  controllers: [],
  providers: [...databaseProviders],
})
export class AppModule { }
