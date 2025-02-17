import {MiddlewareConsumer, Module, ValidationPipe} from '@nestjs/common';
import {CompaniesModule} from './modules/companies/companies.module';
import {JobsModule} from './modules/jobs/jobs.module';
import {UsersModule} from './modules/users/users.module';
import {APP_PIPE} from "@nestjs/core";
import {ConfigModule} from "@nestjs/config";
import {validate} from './env-validation';
import {DatabaseModule} from './common/database/database.module';
import session from 'express-session';
import {AdminsModule} from "./modules/admins/admins.module";

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            envFilePath: `.env.${process.env.NODE_ENV}`,
            validate,
        }),
        DatabaseModule,

        AdminsModule,
        CompaniesModule,
        JobsModule,
        UsersModule,
    ],
    controllers: [],
    providers: [
        {
            provide: APP_PIPE,
            useValue: new ValidationPipe({
                whitelist: true,
            })
        },
    ],
})
export class AppModule {
    configure(consumer: MiddlewareConsumer) {
        consumer.apply(
            session({
                secret: 'my-secret',
                resave: false,
                saveUninitialized: false,
            }),
        ).forRoutes('*');
    }
}
