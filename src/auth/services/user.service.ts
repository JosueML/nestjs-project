import {
    BadRequestException,
    Injectable,
    InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import * as bcrypt from 'bcrypt';
import { Repository } from 'typeorm';

import { CreateUserDto } from '../dto/create-user.dto';
import { User } from '../entities/user.entity';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
    ) {}

    async create(createUserDto: CreateUserDto) {
        const { password, ...newUser } = createUserDto;

        try {
            const user = this.userRepository.create({
                ...newUser,
                password: bcrypt.hashSync(password, 10),
            });

            await this.userRepository.save(user);

            delete user.password;

            return user;
        } catch (error) {
            this.handleDBError(error);
        }
    }

    private handleDBError(error): never {
        if (error.code === '23505') throw new BadRequestException(error.detail);

        throw new InternalServerErrorException('Check server logs');
    }
}
