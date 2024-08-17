import {Body, Controller, Delete, Get, Param, Post, Put, Query} from '@nestjs/common';
import {JobsService} from "./jobs.service";
import {CreateJobDto} from "./dtos/create-job.dto";
import {UpdateJobDto} from "./dtos/update-job.dto";

@Controller('jobs')
export class JobsController {
    constructor(
        private jobsService: JobsService,
    ) {
    }

    @Get(':id')
    async findJob(
        @Param('id') id: string,
    ) {
        return this.jobsService.findOne(parseInt(id));
    }

    @Get()
    findAllJobs(
        @Query('name') name: string,
    ) {
        return this.jobsService.find(name);
    }

    @Post()
    createJob(
        @Body() body: CreateJobDto,
    ) {
        return this.jobsService.create(body.name, body.date);
    }

    @Delete(':id')
    deleteJob(
        @Param('id') id: string,
    ) {
        return this.jobsService.remove(parseInt(id));
    }

    @Put(':id')
    updateJob(
        @Param('id') id: string,
        @Body() body: UpdateJobDto
    ) {
        return this.jobsService.update(parseInt(id), body);
    }
}
