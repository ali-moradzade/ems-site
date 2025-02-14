import {Expose} from "class-transformer";
import {IsString} from "class-validator";

export class UserDto {
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
}
