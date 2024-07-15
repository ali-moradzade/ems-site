import {MiddlewareConsumer, Module, ValidationPipe} from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';
import {EmployeesModule} from './employees/employees.module';
import {JobsModule} from './jobs/jobs.module';
import {Employee} from "./employees/employee.entity";
import {Job} from "./jobs/jobs.entity";
import {UsersModule} from './users/users.module';
import {User} from "./users/user.entity";
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
        TypeOrmModule.forRoot({
            type: 'sqlite',
            database: 'db.sqlite',
            entities: [
                Employee,
                Job,
                User,
            ],
            synchronize: true,
        }),
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
