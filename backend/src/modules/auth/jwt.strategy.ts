import {ExtractJwt, Strategy} from 'passport-jwt';
import {PassportStrategy} from '@nestjs/passport';
import {Injectable} from '@nestjs/common';
import {ConfigService} from "@nestjs/config";
import {UserTokenDto} from "../../dtos/userToken.dto";
import {AdminTokenDto} from "../../dtos/adminToken.dto";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(
        private readonly configService: ConfigService,
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: configService.get<string>('JWT_SECRET_KEY'),
        });
    }

    async validate(payload: any) {
        return payload.superAdmin !== undefined
            ? {id: payload.id, email: payload.email, superAdmin: payload.superAdmin} as AdminTokenDto
            : {id: payload.id, email: payload.email} as UserTokenDto;
    }
}
