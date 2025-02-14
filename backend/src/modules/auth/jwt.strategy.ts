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
        if (payload.superAdmin) {
            return {
                id: payload.id,
                email: payload.email,
                superAdmin: payload.superAdmin,
            } as AdminTokenDto;
        }

        return {
            id: payload.id,
            email: payload.email,
        } as UserTokenDto;
    }
}
