import {IsDate, IsNotEmpty, IsString} from "class-validator";
import {BadRequestException} from "@nestjs/common";
import {Transform} from "class-transformer";

export class CreateJobDto {
    @IsString()
    name: string;

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


