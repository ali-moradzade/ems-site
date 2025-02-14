import {Body, Controller, Delete, Get, Param, Post} from '@nestjs/common';
import {JobsService} from "./jobs.service";
import {CreateJobDto} from "./dtos/create-job.dto";
import {Serialize} from "../../decorators/serialize.decorator";
import {JobDto} from "./dtos/job.dto";

@Controller('jobs')
export class JobsController {
    constructor(
        private jobsService: JobsService,
    ) {
    }

    @Get(':id')
    @Serialize(JobDto)
    async findJob(
        @Param('id') id: string,
    ) {
        return this.jobsService.findOne(id);
    }

    @Get()
    @Serialize(JobDto)
    findAllJobs() {
        return this.jobsService.findAllJobs();
    }

    @Post()
    createJob(
        @Body() {title, description, companyId, expirationDate}: CreateJobDto,
    ) {
        return this.jobsService.create(title, description, companyId, expirationDate);
    }

    @Delete(':id')
    deleteJob(
        @Param('id') id: string,
    ) {
        return this.jobsService.remove(id);
    }
}
