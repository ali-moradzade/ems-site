import {IsEmail, IsNumber} from "class-validator";

export class AuthTokenDto {
    @IsNumber()
    id: number;

    @IsEmail()
    email: string;
}
