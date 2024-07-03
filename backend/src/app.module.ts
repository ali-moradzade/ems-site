import {Module} from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';
import {EmployeesModule} from './employees/employees.module';
import {JobsModule} from './jobs/jobs.module';

@Module({
    imports: [
        EmployeesModule,
        JobsModule,
        TypeOrmModule.forRoot({
            type: 'sqlite',
            database: 'db.sqlite',
            entities: [],
            synchronize: true,
        }),
    ],
    controllers: [],
    providers: [],
})
export class AppModule {
}
