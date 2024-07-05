import {IsEmail, IsOptional, IsPhoneNumber, IsString, Matches} from "class-validator";

export class UpdateEmployeeDto {
    @IsEmail()
    @IsOptional()
    email: string;

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
    @Matches(/^\d{4}(-)(((0)[0-9])|((1)[0-2]))(-)([0-2][0-9]|(3)[0-1])$/i, {
        message: "$property must be formatted as yyyy-mm-dd"
    })
    date: string;
}
