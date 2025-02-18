import {IsBoolean, IsEmail, IsNotEmpty, IsString} from 'class-validator';

export class SignupDto {
    @IsString()
    @IsNotEmpty()
    secretKey: string;

    @IsString()
    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsString()
    @IsNotEmpty()
    password: string;

    @IsString()
    @IsNotEmpty()
    name: string;

    @IsBoolean()
    superAdmin: boolean;
}
