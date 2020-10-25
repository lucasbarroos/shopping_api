import { Controller, Get } from '@nestjs/common';

@Controller('users')
export class UsersController {
    @Get('/')
    findAll(): Array<string> {
        return ['Lucas', 'Victoria', 'Miles', 'Flora'];
    }
}
