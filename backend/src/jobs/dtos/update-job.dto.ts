import {IsDate, IsOptional, IsString} from "class-validator";

export class UpdateJobDto {
    @IsOptional()
    @IsString()
    name: string;

    @IsOptional()
    @IsString()
    @IsDate()
    date: string;
}
