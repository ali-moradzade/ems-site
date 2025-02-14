import {IsBoolean, IsString} from 'class-validator';

export class AdminTokenDto {
    @IsString()
    id: string;
    
    @IsString()
    email: string;
    
    @IsBoolean()
    superAdmin: boolean;
}
