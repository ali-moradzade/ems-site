import {IsEmail, IsString} from "class-validator";

export class UserTokenDto {
    @IsString()
    id: string;

    @IsEmail()
    email: string;
}
