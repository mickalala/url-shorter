import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { UsersRepository } from './users.repository';
import SignUpDto from './dtos/signup.dto';
import { User } from '@prisma/client';

@Injectable()
export class UsersService {

    constructor(
        private readonly usersRepository: UsersRepository,
    ) { }

    async create(signUpDto: SignUpDto) {
        const { email } = signUpDto;
        const user = await this.usersRepository.getUserByEmail(email);
        if (user) throw new ConflictException("E-mail already in use.");

        return this.usersRepository.create({
            ...signUpDto
        });
    }

    async isMatchForPassword(user: User, password: string) {
        if (user.password === password) {
            return true
        } else {
            return false
        };
    }

    async getById(id: number) {
        const user = await this.usersRepository.getUserById(id);
        if (!user) throw new NotFoundException("User not found.");

        return user;
    }

    async getByEmail(email: string) {
        return this.usersRepository.getUserByEmail(email);
    }

}
