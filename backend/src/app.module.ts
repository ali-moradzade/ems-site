import {Module} from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';
import {EmployeesModule} from './employees/employees.module';
import {JobsModule} from './jobs/jobs.module';
import {Employee} from "./employees/employee.entity";
import {Job} from "./jobs/jobs.entity";
import { UsersModule } from './users/users.module';

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
            ],
            synchronize: true,
        }),
    ],
    controllers: [],
    providers: [],
})
export class AppModule {
}
