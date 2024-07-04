import {Body, Controller, Delete, Get, NotFoundException, Param, Patch, Post, Query} from '@nestjs/common';
import {EmployeesService} from "./employees.service";
import {UpdateEmployeeDto} from "./dtos/update-employee.dto";
import {CreateEmployeeDto} from "./dtos/create-employee.dto";

@Controller('employees')
export class EmployeesController {
    constructor(
        private employeesService: EmployeesService,
    ) {
    }

    @Get(':id')
    async findEmployee(
        @Param('id') id: string,
    ) {
        const employee = await this.employeesService.findOne(parseInt(id));

        if (!employee) {
            throw new NotFoundException('Employee not found');
        }

        return employee;
    }

    @Get()
    findAllEmployees(
        @Query('email') email: string,
    ) {
        return this.employeesService.find(email);
    }

    @Post()
    createEmployee(
        @Body() body: CreateEmployeeDto,
    ) {
        const {
            email, password, firstName, lastName,
            phone, job, date
        } = body;

        return this.employeesService.create(email, password, firstName, lastName, phone, job, date);
    }

    @Delete(':id')
    removeEmployee(
        @Param('id') id: string,
    ) {
        return this.employeesService.remove(parseInt(id));
    }

    @Patch(':id')
    updateEmployee(
        @Param('id') id: string,
        @Body() body: UpdateEmployeeDto,
    ) {
        return this.employeesService.update(parseInt(id), body);
    }
}
