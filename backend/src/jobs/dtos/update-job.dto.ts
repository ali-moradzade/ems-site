import {IsOptional, IsString, Matches} from "class-validator";

export class UpdateJobDto {
    @IsOptional()
    @IsString()
    name: string;

    @IsOptional()
    @IsString()
    @Matches(/^\d{4}(-)(((0)[0-9])|((1)[0-2]))(-)([0-2][0-9]|(3)[0-1])$/i, {
        message: "$property must be formatted as yyyy-mm-dd"
    })
    date: string;
}
