import { Module } from '@nestjs/common';
import { AvatarsController } from './avatars.controller';
import { avatarProvider } from './avatars.provider';
import { productsProviders } from '../products/products.providers';
import { DatabaseModule } from '../database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [AvatarsController],
  providers: [
    ...avatarProvider,
    ...productsProviders,
  ],
})
export class AvatarsModule {}