import {IsDate, IsNotEmpty, IsString} from "class-validator";
import {BadRequestException} from "@nestjs/common";
import {Transform} from "class-transformer";

export class CreateJobDto {
    @IsNotEmpty()
    @IsString()
    title: string;

    @IsNotEmpty()
    @IsString()
    description: string;

    @IsNotEmpty()
    @IsString()
    companyId: string;

    @IsNotEmpty()
    @Transform(({value}) => {
        const date = new Date(value);

        if (isNaN(date.getTime())) {
            throw new BadRequestException('Invalid date format, date should be: YYYY-MM-DD');
        }

        return date;
    })
    @IsDate()
    expirationDate: Date;
}


