import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { InjectRepository } from '@nestjs/typeorm';

import { ExtractJwt, Strategy } from 'passport-jwt';
import { Repository } from 'typeorm';

import { User } from '../entities/user.entity';
import { JwtPayload } from '../interfaces/jwt-payload.interface';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,

        private readonly configServices: ConfigService,
    ) {
        super({
            secretOrKey: configServices.get('jwtToken'),
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        });
    }
    async validate(payload: JwtPayload): Promise<User> {
        const { userName } = payload;

        const user = await this.userRepository.findOneBy({ userName });

        if (!user) throw new UnauthorizedException('Token not valid');

        if (!user.isActive)
            throw new UnauthorizedException(
                'Use is inactive, talk with an admin',
            );

        return user;
    }
}
