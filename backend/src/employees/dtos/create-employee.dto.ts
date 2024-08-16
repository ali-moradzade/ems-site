import {IsDate, IsEmail, IsNotEmpty, IsPhoneNumber, IsString} from "class-validator";
import {BadRequestException} from "@nestjs/common";
import {Transform} from "class-transformer";

export class CreateEmployeeDto {
    @IsEmail()
    email: string;

    @IsString()
    @IsNotEmpty()
    firstName: string;

    @IsString()
    @IsNotEmpty()
    lastName: string;

    @IsString()
    @IsPhoneNumber()
    phone: string;

    @IsString()
    @IsNotEmpty()
    job: string;

    @IsNotEmpty()
    @Transform(({value}) => {
        const date = new Date(value);

        if (isNaN(date.getTime())) {
            throw new BadRequestException('Invalid date format, date should be: YYYY-MM-DD');
        }

        return date;
    })
    @IsDate()
    date: Date;
}

