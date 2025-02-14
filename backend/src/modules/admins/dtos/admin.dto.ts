import {IsBoolean, IsString} from 'class-validator';
import {Expose} from 'class-transformer';

export class AdminDto {
    @Expose()
    @IsString()
    id: string;

    @Expose()
    @IsString()
    email: string;

    @Expose()
    @IsString()
    firstName: string;

    @Expose()
    @IsString()
    lastName: string;

    @Expose()
    @IsBoolean()
    superAdmin: boolean;
}
