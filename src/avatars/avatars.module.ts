import { Module } from '@nestjs/common';
import { AvatarsController } from './avatars.controller';
import { avatarProvider } from './avatars.provider';
import { DatabaseModule } from '../database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [AvatarsController],
  providers: [
    ...avatarProvider,
  ],
})
export class AvatarsModule {}