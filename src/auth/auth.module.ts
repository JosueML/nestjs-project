import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AuthController, UserController } from './controllers';
import { User } from './entities/user.entity';
import { AuthService, UserService } from './services';
import { JwtStrategy } from './strategies/jwt.strategies';

@Module({
    imports: [
        ConfigModule,
        TypeOrmModule.forFeature([User]),
        PassportModule.register({
            defaultStrategy: 'jwt',
        }),
        JwtModule.registerAsync({
            imports: [],
            useFactory: () => ({
                // ! Aqui debo poner el TOKEN con ConfigServices
                secret: process.env.JWT_TOKEN,
                signOptions: {
                    expiresIn: '2h',
                },
            }),
        }),
    ],
    controllers: [AuthController, UserController],
    providers: [AuthService, UserService, JwtStrategy],
    exports: [TypeOrmModule, JwtStrategy, PassportModule, JwtModule],
})
export class AuthModule {}
