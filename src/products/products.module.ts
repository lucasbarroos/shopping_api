import { Module } from '@nestjs/common';
import { ProductsController } from './products.controller';
import { productsProviders } from './products.providers';
import { DatabaseModule } from '../database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [ProductsController],
  providers: [
    ...productsProviders,
  ],
})
export class ProductsModule {}