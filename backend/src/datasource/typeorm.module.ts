import {Global, Module} from "@nestjs/common";
import {ConfigModule, ConfigService} from "@nestjs/config";
import {DataSource} from "typeorm";
import {User} from "../users/user.entity";
import {Employee} from "../employees/employee.entity";
import {Job} from "../jobs/jobs.entity";

@Global()
@Module({
    imports: [ConfigModule],
    providers: [
        {
            provide: DataSource,
            inject: [ConfigService],
            useFactory: async (config: ConfigService) => {
                try {
                    const dataSource = new DataSource({
                            type: 'sqlite',
                            database: config.get<string>('DB_NAME'),
                            synchronize: true,
                            entities: [
                                Employee,
                                Job,
                                User,
                            ],

                            // If we are in test environment, drop the db contents
                            dropSchema: config.get<string>('NODE_ENV') === 'test',
                        }
                    );

                    await dataSource.initialize(); // initialize the data source

                    return dataSource;
                } catch (error) {
                    throw error;
                }
            },
        },
    ],
    exports: [DataSource],
})
export class TypeOrmModule {
}
