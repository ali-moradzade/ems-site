import {BadRequestException, Injectable, NotFoundException} from '@nestjs/common';
import {InjectModel} from "@nestjs/mongoose";
import {Model} from "mongoose";
import {Job, JobDocument} from "../../common/database/schemas/job.schema";

@Injectable()
export class JobsService {
    constructor(
        @InjectModel(Job.name) private repository: Model<JobDocument>,
    ) {
    }

    findOne(id: string) {
        return this.repository.findById(id);
    }

    findByTitle(title: string) {
        return this.repository.findOne({title});
    }

    findAllJobs() {
        return this.repository.find();
    }

    async create(title: string, description: string, companyId: string, expirationDate: Date) {
        const result = await this.findByTitle(title);
        if (result) {
            throw new BadRequestException('Job with this title already exists');
        }

        return this.repository.create({title, description, _companyId: companyId, expirationDate});
    }

    async remove(id: string) {
        const job = await this.repository.findByIdAndDelete(id);
        if (!job) {
            throw new NotFoundException(`Job with id ${id} not found`);
        }

        return job;
    }
}
