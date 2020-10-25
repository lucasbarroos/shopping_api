import { Module } from '@nestjs/common';
import { AppController } from './App/app.controller';
import { AppService } from './App/app.service';
import { UsersController } from './users/users.controller';

@Module({
  imports: [],
  controllers: [AppController, UsersController],
  providers: [AppService],
})
export class AppModule {}
