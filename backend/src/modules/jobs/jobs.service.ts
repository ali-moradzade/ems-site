import {Injectable, NotFoundException} from '@nestjs/common';
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
        if (!id) {
            return null;
        }

        return this.repository.findById(id);
    }

    findByTitle(title: string) {
        return this.repository.find({title});
    }

    create(name: string, date: Date) {
        const job = this.repo.create({name, date});
        return this.repo.save(job);
    }

    async update(id: number, attrs: Partial<Job>) {
        const job = await this.findOne(id);

        if (!job) {
            throw new NotFoundException('Job not found');
        }

        Object.assign(job, attrs);

        return this.repo.save(job);
    }

    async remove(id: number) {
        const job = await this.findOne(id);

        if (!job) {
            throw new NotFoundException('Job not found');
        }

        return this.repo.remove(job);
    }
}
