import {BadRequestException} from "@nestjs/common";
import {IsDate, IsOptional, IsString} from "class-validator";
import {Transform} from "class-transformer";

export class UpdateJobDto {
    @IsOptional()
    @IsString()
    name?: string;

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
