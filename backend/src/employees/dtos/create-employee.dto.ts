import {IsEmail, IsPhoneNumber, IsString, Matches} from "class-validator";

export class CreateEmployeeDto {
    @IsEmail()
    email: string;

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
    @Matches(/^\d{4}(-)(((0)[0-9])|((1)[0-2]))(-)([0-2][0-9]|(3)[0-1])$/i, {
        message: "$property must be formatted as yyyy-mm-dd"
    })
    date: string;
}

