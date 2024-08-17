import {Body, Controller, Delete, Get, Param, Post, Put, Query} from '@nestjs/common';
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
        return this.employeesService.findOne(parseInt(id));
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
        return this.employeesService.create(body);
    }

    @Delete(':id')
    removeEmployee(
        @Param('id') id: string,
    ) {
        return this.employeesService.remove(parseInt(id));
    }

    @Put(':id')
    updateEmployee(
        @Param('id') id: string,
        @Body() body: UpdateEmployeeDto,
    ) {
        return this.employeesService.update(parseInt(id), body);
    }
}
