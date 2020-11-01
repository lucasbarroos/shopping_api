import { Module } from '@nestjs/common';
import { ImagesController } from './images.controller';
import { imageProvider } from './images.provider';
import { productsProviders } from '../products/products.providers';
import { DatabaseModule } from '../database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [ImagesController],
  providers: [
    ...imageProvider,
    ...productsProviders,
  ],
})
export class ImagesModule { }