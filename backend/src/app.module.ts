import {MiddlewareConsumer, Module, ValidationPipe} from '@nestjs/common';
import {TypeOrmModule} from './datasource/typeorm.module';
import {EmployeesModule} from './employees/employees.module';
import {JobsModule} from './jobs/jobs.module';
import {UsersModule} from './users/users.module';
import {APP_PIPE} from "@nestjs/core";
import {ConfigModule} from "@nestjs/config";
import {validate} from './env-validation'

const cookieSession = require('cookie-session');

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            envFilePath: `.env.${process.env.NODE_ENV}`,
            validate,
        }),
        TypeOrmModule,
        EmployeesModule,
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
        consumer.apply(cookieSession({
            keys: ['randomNumbers1343515AndLetters'],
        })).forRoutes('*');
    }
}
