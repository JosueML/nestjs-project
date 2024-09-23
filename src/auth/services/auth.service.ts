import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';

import * as bcrypt from 'bcrypt';
import { Repository } from 'typeorm';

import { LoginUserDto } from '../dto';
import { User } from '../entities/user.entity';
import { JwtPayload } from '../interfaces/jwt-payload.interface';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,

        private readonly jwtService: JwtService,
    ) {}
    async login(loginUserDto: LoginUserDto) {
        const { userName, password } = loginUserDto;

        const user = await this.userRepository.findOne({
            where: { userName },
            select: { id: true, userName: true, password: true },
        });

        if (!user) throw new UnauthorizedException('Credentials are not valid');

        if (bcrypt.compareSync(password, user.password))
            throw new UnauthorizedException('Credentials are not valid');

        delete user.password;

        return {
            ...user,
            token: this.getJwtToken({ id: user.id, userName: user.userName }),
        };
    }

    private getJwtToken(payload: JwtPayload) {
        const token = this.jwtService.sign(payload);
        return token;
    }
}
