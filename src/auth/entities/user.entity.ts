import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('users')
export class User {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('text', {
        unique: true,
    })
    userName: string;

    @Column('text')
    fullName: string;

    @Column('text', {
        select: false,
    })
    password: string;

    @Column('bool', {
        default: true,
    })
    isActive: boolean;

    @Column('text', {
        array: true,
        default: ['user'],
    })
    roles: string[];
}
