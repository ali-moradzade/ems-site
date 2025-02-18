import {IsNotEmpty, IsString} from "class-validator";
import {Expose} from "class-transformer";

export class CompanyDto {
    @Expose()
    @IsString()
    id: string;

    @Expose()
    @IsString()
    name: string;

    @Expose()
    @IsString()
    description: string;

    @Expose()
    @IsString()
    logo: string;
}

