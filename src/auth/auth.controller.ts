import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import SignUpDto from './dtos/signup.dto';
import SignInDto from './dtos/signin.dto';

@Controller("users")
export class AuthController {

    constructor(private readonly authService: AuthService) { }

    // create
    @Post("sign-up")
    @HttpCode(HttpStatus.CREATED)
    signUp(@Body() signUpDto: SignUpDto) {
    }

    // login
    @Post("sign-in")
    @HttpCode(HttpStatus.OK)
    signIn(@Body() signInDto: SignInDto) {

    }
}