import {Injectable, NotFoundException} from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {Job} from "./jobs.entity";
import {Repository} from "typeorm";

@Injectable()
export class JobsService {
    constructor(
        @InjectRepository(Job) private repo: Repository<Job>,
    ) {
    }

    findOne(id: number) {
        if (!id) {
            return null;
        }

        return this.repo.findOneBy({id});
    }

    find(name: string) {
        return this.repo.findBy({name});
    }

    create(name: string, date: string) {
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
