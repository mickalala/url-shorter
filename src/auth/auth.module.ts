import { Global, Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersService } from './users.service';
import { JwtModule } from '@nestjs/jwt';
import { UsersRepository } from './users.repository';
import { CryptoModule } from 'src/crypto/crypto.module';

@Global()
@Module({
  imports: [JwtModule.register({
    secret: process.env.JWT_SECRET
  }), CryptoModule],
  controllers: [AuthController],
  providers: [AuthService, UsersService, UsersRepository],
  exports: [AuthService, UsersService]
})
export class AuthModule { }
