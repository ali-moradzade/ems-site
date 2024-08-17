import {IsEmail, IsNotEmpty, IsString} from "class-validator";

export class CreateUserDto {
    @IsEmail()
    @IsString()
    email: string;

    @IsString()
    @IsNotEmpty()
    password: string;

    @IsString()
    @IsNotEmpty()
    firstName: string;

    @IsString()
    @IsNotEmpty()
    lastName: string;
}
