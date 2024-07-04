import {Body, Controller, Delete, Get, NotFoundException, Param, Patch, Post, Query} from '@nestjs/common';
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
        const job = await this.jobsService.findOne(parseInt(id));

        if (!job) {
            throw new NotFoundException('Job not found');
        }

        return job;
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

    @Patch(':id')
    updateJob(
        @Param('id') id: string,
        @Body() body: UpdateJobDto
    ) {
        return this.jobsService.update(parseInt(id), body);
    }
}
