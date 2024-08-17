import {Module} from '@nestjs/common';
import {UsersService} from './users.service';
import {UsersController} from './users.controller';
import {TypeOrmModule} from "@nestjs/typeorm";
import {User} from "./user.entity";
import {AuthService} from './auth.service';
import {CurrentUserInterceptor} from "./interceptors/current-user.interceptor";
import {APP_INTERCEPTOR} from "@nestjs/core";
import {JwtModule} from "@nestjs/jwt";
import {ConfigModule, ConfigService} from "@nestjs/config";

@Module({
    imports: [
        TypeOrmModule.forFeature([
            User,
        ]),
        JwtModule.registerAsync({
            imports: [ConfigModule],
            useFactory: async (configService: ConfigService) => ({
                secret: configService.get<string>('JWT_SECRET_KEY'),
                signOptions: {expiresIn: '1d'},
            }),
            inject: [ConfigService],
        }),
    ],
    providers: [
        UsersService,
        AuthService,
        {
            provide: APP_INTERCEPTOR,
            useValue: CurrentUserInterceptor,
        }
    ],
    controllers: [UsersController],
})
export class UsersModule {
}
