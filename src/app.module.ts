import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MulterModule } from '@nestjs/platform-express';
import { ProductsModule } from './products/products.module';
import { DatabaseModule } from './database/database.module';
import { databaseProviders } from './database/database.providers';
import { AvatarsModule } from './avatars/avatars.module';

const multerModule = MulterModule.registerAsync({
  useFactory: () => ({
    dest: './uploads',
  }),
});

@Module({
  imports: [DatabaseModule, MongooseModule, multerModule, ProductsModule, AvatarsModule],
  controllers: [],
  providers: [...databaseProviders],
})
export class AppModule {}
