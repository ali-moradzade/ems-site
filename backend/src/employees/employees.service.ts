import {BadRequestException, Injectable, NotFoundException} from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {Employee} from "./employee.entity";
import {Repository} from "typeorm";

@Injectable()
export class EmployeesService {
    constructor(
        @InjectRepository(Employee) private repo: Repository<Employee>,
    ) {
    }

    findOne(id: number) {
        if (!id) {
            return null;
        }

        return this.repo.findOneBy({
            id,
        });
    }

    find(email: string) {
        return this.repo.findBy({
            email,
        });
    }

    async create(
        email: string, firstName: string, lastName: string,
        phone: string, job: string, date: string
    ) {
        const employees = await this.find(email);
        if (employees.length) {
            throw new BadRequestException('Email in use');
        }
        const employee = this.repo.create({
            email, firstName, lastName, phone, job, date,
        });

        return this.repo.save(employee);
    }

    async update(id: number, attrs: Partial<Employee>) {
        const employee = await this.findOne(id);

        if (!employee) {
            throw new NotFoundException('Employee not found');
        }

        Object.assign(employee, attrs);

        return this.repo.save(employee);
    }

    async remove(id: number) {
        const employee = await this.findOne(id);

        if (!employee) {
            throw new NotFoundException('Employee not found');
        }

        return this.repo.remove(employee);
    }
}
