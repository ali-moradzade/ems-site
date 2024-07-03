import {Module} from '@nestjs/common';
import { EmployeesModule } from './employees/employees.module';

@Module({
    imports: [EmployeesModule],
    controllers: [],
    providers: [],
})
export class AppModule {
}
