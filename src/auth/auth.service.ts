import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import SignUpDto from './dtos/signup.dto';
import SignInDto from './dtos/signin.dto';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from './users.service';
import { User } from '@prisma/client';

@Injectable()
export class AuthService {

  private EXPIRATION_TIME = "7 days";
  private ISSUER = "micka";
  private AUDIENCE = "users";

  constructor(
    private readonly jwtService: JwtService,
    private readonly usersService: UsersService) { }

  async signUp(signUpDto: SignUpDto) {
    return await this.usersService.create(signUpDto);
  }

  async signIn(signInDto: SignInDto) {
    const { email, password } = signInDto;

    const user = await this.usersService.getByEmail(email);
    if (!user) throw new UnauthorizedException(`Email or password not valid.`);

    const isMatch = await this.usersService.isMatchForPassword(user, password);
    if (!isMatch) throw new UnauthorizedException(`Email or password not valid.`);

    return this.createToken(user);
  }

  private async createToken(user: User) {
    const { id, email } = user;

    const token = this.jwtService.sign({ email }, {
      expiresIn: this.EXPIRATION_TIME,
      subject: String(id),
      issuer: this.ISSUER,
      audience: this.AUDIENCE
    });

    return { token }
  }

  checkToken(token: string) {
    if (!token) {
      throw new UnauthorizedException('Token not provided');
  }
    try {
      const data = this.jwtService.verify(token, {
        audience: this.AUDIENCE,
        issuer: this.ISSUER
      });

      return data;
    } catch (error) {
      console.log(error);
      throw new BadRequestException(error);
    }
  }

}
