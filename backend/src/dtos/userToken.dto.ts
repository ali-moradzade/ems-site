import {IsEmail, IsNumber} from "class-validator";

export class UserTokenDto {
    @IsNumber()
    id: number;

    @IsEmail()
    email: string;
}
