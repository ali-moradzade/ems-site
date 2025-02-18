import {Body, Controller, Delete, Get, Param, Post, UseGuards} from '@nestjs/common';
import {CompaniesService} from "./companies.service";
import {CreateCompanyDto} from "./dtos/create-company.dto";
import {Serialize} from "../../decorators/serialize.decorator";
import {CompanyDto} from "./dtos/company.dto";
import {ParseObjectIdPipe} from "../../pipes/parseObjectId.pipe";
import {AdminGuard} from "../../gaurds/admin.guard";

@Controller('companies')
@Serialize(CompanyDto)
export class CompaniesController {
    constructor(
        private companiesService: CompaniesService,
    ) {
    }

    @Get(':id')
    async findCompany(
        @Param('id', ParseObjectIdPipe) id: string,
    ) {
        return this.companiesService.findOne(id);
    }

    @Get()
    findAllCompanies() {
        return this.companiesService.findAllCompanies();
    }

    @Post()
    @UseGuards(AdminGuard)
    createCompany(
        @Body() {name, description, logo}: CreateCompanyDto,
    ) {
        return this.companiesService.create(name, description, logo);
    }

    @Delete(':id')
    @UseGuards(AdminGuard)
    removeCompany(
        @Param('id', ParseObjectIdPipe) id: string,
    ) {
        return this.companiesService.remove(id);
    }
}
