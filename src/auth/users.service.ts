import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { UsersRepository } from './users.repository';
import SignUpDto from './dtos/signup.dto';
import { User } from '@prisma/client';
import { BcryptService } from 'src/crypto/bcrypt.service';

@Injectable()
export class UsersService {

    constructor(
        private readonly usersRepository: UsersRepository,
        private readonly bcrypt: BcryptService
    ) { }

    async create(signUpDto: SignUpDto) {
        const { email } = signUpDto;
        const user = await this.usersRepository.getUserByEmail(email);
        if (user) throw new ConflictException("E-mail already in use.");

        return this.usersRepository.create({
            ...signUpDto,
            password: this.bcrypt.hash(signUpDto.password)
        });
    }

    async isMatchForPassword(user: User, password: string) {
        return await this.bcrypt.compare(password, user.password)
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
