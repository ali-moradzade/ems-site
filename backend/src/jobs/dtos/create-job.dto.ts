import {IsDate, IsString} from "class-validator";

export class CreateJobDto {
    @IsString()
    name: string;

    @IsString()
    @IsDate()
    date: string;
}


