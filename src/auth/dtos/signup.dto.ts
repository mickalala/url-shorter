import { IsEmail, IsNotEmpty, IsString, IsStrongPassword } from 'class-validator';

export default class SignUpDto {
    @IsNotEmpty()
    @IsString()
    username: string;

    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    @IsStrongPassword()
    password: string;
}
