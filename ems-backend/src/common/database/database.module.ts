import {Global, Module} from '@nestjs/common';
import {ConfigModule, ConfigService} from '@nestjs/config';
import {MongooseModule} from '@nestjs/mongoose';
import {User, UserSchema} from './schemas/user.schema';
import {Admin, AdminSchema} from './schemas/admin.schema';
import {Job, JobSchema} from './schemas/job.schema';
import {Company, CompanySchema} from "./schemas/company.schema";
import {getMongoUri} from "../../env-validation";

@Global()
@Module({
    imports: [
        ConfigModule,
        MongooseModule.forRootAsync({
            imports: [ConfigModule],
            useFactory: async (configService: ConfigService) => ({
                uri: getMongoUri(configService),
            }),
            inject: [ConfigService],
        }),
        MongooseModule.forFeature([
            {
                name: User.name,
                schema: UserSchema,
            },
            {
                name: Admin.name,
                schema: AdminSchema,
            },
            {
                name: Company.name,
                schema: CompanySchema,
            },
            {
                name: Job.name,
                schema: JobSchema,
            },
        ]),
    ],
    providers: [],
    exports: [
        MongooseModule,
    ],
})
export class DatabaseModule {
}
