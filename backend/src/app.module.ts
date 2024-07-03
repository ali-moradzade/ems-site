import {Module} from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';
import {EmployeesModule} from './employees/employees.module';
import {JobsModule} from './jobs/jobs.module';
import {Employee} from "./employees/employee.entity";
import {Job} from "./jobs/jobs.entity";

@Module({
    imports: [
        EmployeesModule,
        JobsModule,
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
