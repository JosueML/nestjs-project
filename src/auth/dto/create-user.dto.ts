import { IsString } from 'class-validator';

export class CreateUserDto {
    @IsString()
    userName: string;

    @IsString()
    fullName: string;

    @IsString()
    password: string;
}
