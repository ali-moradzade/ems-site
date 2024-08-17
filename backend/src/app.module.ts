import {MiddlewareConsumer, Module, ValidationPipe} from '@nestjs/common';
import {EmployeesModule} from './modules/employees/employees.module';
import {JobsModule} from './modules/jobs/jobs.module';
import {UsersModule} from './modules/users/users.module';
import {APP_PIPE} from "@nestjs/core";
import {ConfigModule, ConfigService} from "@nestjs/config";
import {validate} from './env-validation';
import {createDataSourceOptions} from "../typeorm.config";
import {TypeOrmModule} from "@nestjs/typeorm";

const cookieSession = require('cookie-session');

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            envFilePath: `.env.${process.env.NODE_ENV}`,
            validate,
        }),
        TypeOrmModule.forRootAsync({
            imports: [ConfigModule],
            useFactory: async (configService: ConfigService) => createDataSourceOptions(configService),
            inject: [ConfigService],
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
