import {Injectable} from '@nestjs/common';
import {JwtService} from '@nestjs/jwt';
import {AdminTokenDto} from '../../dtos/adminToken.dto';
import {UserTokenDto} from "../../dtos/userToken.dto";

@Injectable()
export class AuthService {
    constructor(
        private jwtService: JwtService,
    ) {
    }

    createJwtToken(user: any): string {
        const payload = user.superAdmin !== undefined
            ? {id: user.id, email: user.email, superAdmin: user.superAdmin} as AdminTokenDto
            : {id: user.id, email: user.email} as UserTokenDto;

        return this.jwtService.sign(payload);
    }
}
