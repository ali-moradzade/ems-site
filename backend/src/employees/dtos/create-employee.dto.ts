import {IsDate, IsEmail, IsPhoneNumber, IsString} from "class-validator";

export class CreateEmployeeDto {
    @IsEmail()
    email: string;

    @IsString()
    password: string;

    @IsString()
    firstName: string;

    @IsString()
    lastName: string;

    @IsString()
    @IsPhoneNumber()
    phone: string;

    @IsString()
    job: string;

    @IsString()
    @IsDate()
    date: string;
}

