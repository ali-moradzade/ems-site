import {Module} from '@nestjs/common';
import { EmployeesModule } from './employees/employees.module';
import { JobsModule } from './jobs/jobs.module';

@Module({
    imports: [EmployeesModule, JobsModule],
    controllers: [],
    providers: [],
})
export class AppModule {
}
