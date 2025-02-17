import {Expose} from "class-transformer";
import {IsDate, IsString} from "class-validator";

export class JobDto {
    @Expose()
    @IsString()
    id: string;

    @Expose()
    @IsString()
    title: string;

    @Expose()
    @IsString()
    companyId: string;

    @Expose()
    @IsDate()
    creationDate: Date;

    @Expose()
    @IsDate()
    expirationDate: Date;
}
