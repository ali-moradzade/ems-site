import {Injectable, NotFoundException} from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {Employee} from "./employee.entity";
import {Repository} from "typeorm";

@Injectable()
export class EmployeesService {
    constructor(
        @InjectRepository(Employee) private repo: Repository<Employee>,
    ) {
    }

    create(
        email: string, password: string, firstName: string, lastName: string,
        phone: string, job: string, date: string
    ) {
        const employee = this.repo.create({
            email, password, firstName,
            lastName, phone, job, date,
        });

        return this.repo.save(employee);
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
