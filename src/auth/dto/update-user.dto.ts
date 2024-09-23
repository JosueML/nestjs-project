import { PartialType } from '@nestjs/mapped-types';

import { IsArray, IsBoolean, IsString } from 'class-validator';

import { ValidRoles } from '../interfaces';
import { CreateUserDto } from './create-user.dto';

export class UpdateUserDto extends PartialType(CreateUserDto) {
    @IsString()
    id: string;

    @IsBoolean()
    isActivate: boolean;

    @IsString()
    @IsArray()
    roles: ValidRoles[];
}
