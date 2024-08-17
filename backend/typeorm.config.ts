import {DataSourceOptions} from 'typeorm';
import {ConfigService} from '@nestjs/config';
import {Employee} from "./src/modules/employees/employee.entity";
import {Job} from "./src/modules/jobs/jobs.entity";
import {User} from "./src/modules/users/user.entity";

export const createDataSourceOptions = (config: ConfigService): DataSourceOptions => {
    return {
        type: 'sqlite',
        database: config.get<string>('DB_NAME'),
        entities: [
            Employee,
            Job,
            User,

        ],
        migrations: ['dist/src/migrations/*.js'],

        // If we are in test environment, drop the db contents, and use synchronization
        synchronize: config.get<string>('NODE_ENV') === 'test',
        dropSchema: config.get<string>('NODE_ENV') === 'test',
    };
};
