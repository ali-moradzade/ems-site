import {IsDate, IsEmail, IsOptional, IsPhoneNumber, IsString} from "class-validator";

export class UpdateEmployeeDto {
    @IsEmail()
    @IsOptional()
    email: string;

    @IsString()
    @IsOptional()
    password: string;

    @IsString()
    @IsOptional()
    firstName: string;

    @IsString()
    @IsOptional()
    lastName: string;

    @IsString()
    @IsOptional()
    @IsPhoneNumber()
    phone: string;

    @IsString()
    @IsOptional()
    job: string;

    @IsString()
    @IsOptional()
    @IsDate()
    date: string;
}
