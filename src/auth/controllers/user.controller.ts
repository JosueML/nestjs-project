import { Controller, Post } from '@nestjs/common';

import { CreateUserDto } from '../dto/create-user.dto';
import { UserService } from '../services/user.service';

@Controller('users')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Post()
    create(createUserDto: CreateUserDto) {
        return this.userService.create(createUserDto);
    }
}
