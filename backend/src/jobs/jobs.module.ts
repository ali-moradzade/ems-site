import {Module} from '@nestjs/common';
import {JobsService} from './jobs.service';
import {JobsController} from './jobs.controller';
import {TypeOrmModule} from "@nestjs/typeorm";
import {Job} from "./jobs.entity";

@Module({
    providers: [JobsService],
    controllers: [JobsController],
    imports: [
        TypeOrmModule.forFeature([
            Job,
        ])
    ]
})
export class JobsModule {
}
