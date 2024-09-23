import {
    BadRequestException,
    Injectable,
    InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import * as bcrypt from 'bcrypt';
import { Repository } from 'typeorm';

import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
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

    async update(id: string, updateUserDto: UpdateUserDto) {
        const { password, ...updateData } = updateUserDto;

        try {
            const user = await this.userRepository.preload({
                id,
                ...updateData,
                password: password ? bcrypt.hashSync(password, 10) : undefined,
            });

            if (!user) {
                throw new BadRequestException('User not found');
            }

            await this.userRepository.save(user);

            delete user.password;

            return user;
        } catch (error) {
            this.handleDBError(error);
        }
    }

    async findAll() {
        const users = await this.userRepository.find();
        return users;
    }

    async findOne(id: string) {
        const user = await this.userRepository.findOneBy({ id });
        if (!user) {
            throw new BadRequestException('User not found');
        }
        return user;
    }

    async remove(id: string) {
        const user = await this.findOne(id);
        await this.userRepository.remove(user);
        return { message: 'User removed successfully' };
    }

    private handleDBError(error): never {
        if (error.code === '23505') throw new BadRequestException(error.detail); // Error de duplicados
        throw new InternalServerErrorException('Check server logs'); // Error genérico del servidor
    }
}
