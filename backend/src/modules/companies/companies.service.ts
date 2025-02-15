import {BadRequestException, Injectable, NotFoundException} from '@nestjs/common';
import {InjectModel} from "@nestjs/mongoose";
import {Company, CompanyDocument} from "../../common/database/schemas/company.schema";
import {Model} from "mongoose";

@Injectable()
export class CompaniesService {
    constructor(
        @InjectModel(Company.name) private repository: Model<CompanyDocument>
    ) {
    }

    findOne(id: string) {
        return this.repository.findById(id);
    }

    findAllCompanies() {
        return this.repository.find();
    }

    findByName(name: string) {
        return this.repository.findOne({name});
    }

    async create(name: string, description: string, logo: string) {
        const result = await this.findByName(name);

        if (result) {
            throw new BadRequestException('Company with this name already exists');
        }

        return this.repository.create({name, description, logo});
    }

    async remove(id: string) {
        const company = await this.repository.findByIdAndDelete(id);
        if (!company) {
            throw new NotFoundException('Company with this id not found');
        }

        return company;
    }
}
