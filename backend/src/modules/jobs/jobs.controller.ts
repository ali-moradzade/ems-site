import {Body, Controller, Delete, Get, Param, Post, UseGuards} from '@nestjs/common';
import {JobsService} from "./jobs.service";
import {CreateJobDto} from "./dtos/create-job.dto";
import {Serialize} from "../../decorators/serialize.decorator";
import {JobDto} from "./dtos/job.dto";
import {ParseObjectIdPipe} from "../../pipes/parseObjectId.pipe";
import {AdminGuard} from "../../gaurds/admin.guard";

@Controller('jobs')
@Serialize(JobDto)
export class JobsController {
    constructor(
        private jobsService: JobsService,
    ) {
    }

    @Get(':id')
    async findJob(
        @Param('id', ParseObjectIdPipe) id: string,
    ) {
        return this.jobsService.findOne(id);
    }

    @Get()
    findAllJobs() {
        return this.jobsService.findAllJobs();
    }

    @Post()
    @UseGuards(AdminGuard)
    createJob(
        @Body() {title, description, companyId, expirationDate}: CreateJobDto,
    ) {
        return this.jobsService.create(title, description, companyId, expirationDate);
    }

    @Delete(':id')
    @UseGuards(AdminGuard)
    deleteJob(
        @Param('id', ParseObjectIdPipe) id: string,
    ) {
        return this.jobsService.remove(id);
    }
}
