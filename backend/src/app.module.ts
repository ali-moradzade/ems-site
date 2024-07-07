import {Module} from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';
import {EmployeesModule} from './employees/employees.module';
import {JobsModule} from './jobs/jobs.module';
import {Employee} from "./employees/employee.entity";
import {Job} from "./jobs/jobs.entity";
import {UsersModule} from './users/users.module';
import {User} from "./users/user.entity";

@Module({
    imports: [
        EmployeesModule,
        JobsModule,
        UsersModule,
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
    ],
    controllers: [],
    providers: [],
})
export class AppModule {
}
