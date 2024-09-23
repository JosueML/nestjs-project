import { Body, Controller, Post } from '@nestjs/common';

import { LoginUserDto } from '../dto';
import { AuthService } from '../services/auth.service';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('login')
    login(@Body() loginUserDto: LoginUserDto) {
        this.authService.login(loginUserDto);
    }
}
