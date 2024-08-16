import {beforeEach, describe, expect, it, test, vi} from "vitest";
import {Test, TestingModule} from '@nestjs/testing';
import {EmployeesService} from './employees.service';
import {getRepositoryToken} from "@nestjs/typeorm";
import {Employee} from "./employee.entity";
import {Repository} from "typeorm";
import {CreateEmployeeDto} from "./dtos/create-employee.dto";

describe('EmployeesService', () => {
    let service: EmployeesService;
    let mockRepo: Partial<Repository<Employee>>;
    let employeeMock: Employee;

    beforeEach(async () => {
        employeeMock = {
            id: 1,
            email: 'example@gmail.com',
            firstName: 'name',
            lastName: 'name',
            phone: 'phone',
            job: 'job',
            date: new Date(),
        };
        mockRepo = {
            findOneBy: vi.fn().mockResolvedValue(null),
            findBy: vi.fn().mockResolvedValue([]),
            create: vi.fn().mockResolvedValue(employeeMock),
            save: vi.fn().mockResolvedValue(employeeMock),
            remove: vi.fn().mockResolvedValue(employeeMock),
        };

        const module: TestingModule = await Test.createTestingModule({
            providers: [
                EmployeesService,
                {
                    provide: getRepositoryToken(Employee),
                    useValue: mockRepo,
                }
            ],
        }).compile();

        service = module.get<EmployeesService>(EmployeesService);
        mockRepo = module.get(getRepositoryToken(Employee));
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
        expect(mockRepo).toBeDefined();
    });

    describe('create', () => {
        test('valid properties, creates employee', async () => {
            const employee = await service.create(employeeMock);

            expect(employee).toBeDefined();
            expect(employee.id).toEqual(employeeMock.id);
        });

        test('existing employee with email, throws BadRequestException', async () => {
            vi.spyOn(mockRepo, 'findBy').mockResolvedValue([employeeMock]);
            const createEmployeeDto: CreateEmployeeDto = employeeMock;

            await expect(service.create(createEmployeeDto)).rejects.toThrow(/Email in use/);
        });
    });

    describe('update', () => {
        test('existing employee, updates it', async () => {
            vi.spyOn(mockRepo, 'findOneBy').mockResolvedValue(employeeMock);
            vi.spyOn(mockRepo, 'save').mockImplementation((arg: any) => Promise.resolve(arg));
            const id = employeeMock.id;
            const properties: Partial<Employee> = {
                firstName: 'new-firstName',
            };

            const employee = await service.update(id, properties);

            expect(employee).toBeDefined();
            expect(employee.firstName).toEqual(properties.firstName);
        });

        test('non-existent employee with that id, throws NotFoundException', async () => {
            const id = 1000;
            const properties: Partial<Employee> = {
                firstName: 'new-firstName',
            };

            await expect(service.update(id, properties)).rejects.toThrow(/not found/);
        });
    });
});
