import {IsEmail, IsOptional, IsString} from "class-validator";

export class UpdateUserDto {
    @IsOptional()
    @IsEmail()
    @IsString()
    email: string;

    @IsOptional()
    @IsString()
    password: string;

    @IsOptional()
    @IsString()
    firstName: string;

    @IsOptional()
    @IsString()
    lastName: string;
}
