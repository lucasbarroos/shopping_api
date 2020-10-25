import { Controller, Get, Req } from '@nestjs/common';
import { Request } from 'express';

@Controller('users')
export class UsersController {
    @Get('/')
    findAll(@Req() request: Request): string {
        return 'Here you are, your users!';
    }
}
