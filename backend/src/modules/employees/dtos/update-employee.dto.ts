import {IsDate, IsEmail, IsOptional, IsPhoneNumber, IsString} from "class-validator";
import {Transform} from "class-transformer";
import {BadRequestException} from "@nestjs/common";

export class UpdateEmployeeDto {
    @IsEmail()
    @IsOptional()
    email?: string;

    @IsString()
    @IsOptional()
    firstName?: string;

    @IsString()
    @IsOptional()
    lastName?: string;

    @IsString()
    @IsOptional()
    @IsPhoneNumber()
    phone?: string;

    @IsString()
    @IsOptional()
    job?: string;

    @IsOptional()
    @Transform(({value}) => {
        if (!value) {
            return;
        }

        const date = new Date(value);

        if (isNaN(date.getTime())) {
            throw new BadRequestException('Invalid date format, date should be: YYYY-MM-DD');
        }

        return date;
    })
    @IsDate()
    date?: Date;
}
