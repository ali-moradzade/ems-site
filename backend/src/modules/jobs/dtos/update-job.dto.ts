import {BadRequestException} from "@nestjs/common";
import {IsDate, IsNotEmpty, IsOptional, IsString} from "class-validator";
import {Transform} from "class-transformer";

export class UpdateJobDto {
    @IsOptional()
    @IsString()
    name: string;

    @IsOptional()
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
