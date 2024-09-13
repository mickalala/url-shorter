import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import SignUpDto from './dtos/signup.dto';

@Injectable()
export class UsersRepository {

  constructor(private readonly prisma: PrismaService) { }

  create(signUpDto: SignUpDto) {
    return this.prisma.user.create({
      data: signUpDto
    })
  }

  getUserById(id: number) {
    return this.prisma.user.findUnique({
      where: { id }
    })
  }

  getUserByEmail(email: string) {
    return this.prisma.user.findUnique({
      where: {
        email
      }
    })
  }
}
