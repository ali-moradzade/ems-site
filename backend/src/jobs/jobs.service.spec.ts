import {beforeEach, describe, expect, it, test, vi} from "vitest";
import {Test, TestingModule} from '@nestjs/testing';
import {getRepositoryToken} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {JobsService} from "./jobs.service";
import {Job} from "./jobs.entity";

describe('JobsService', () => {
    let service: JobsService;
    let mockRepo: Partial<Repository<Job>>;
    let jobMock: Job;

    beforeEach(async () => {
        jobMock = {
            id: 1,
            name: 'job',
            date: new Date(),
        };
        mockRepo = {
            findOneBy: vi.fn().mockResolvedValue(null),
            findBy: vi.fn().mockResolvedValue([]),
            create: vi.fn().mockResolvedValue(jobMock),
            save: vi.fn().mockResolvedValue(jobMock),
            remove: vi.fn().mockResolvedValue(jobMock),
        };

        const module: TestingModule = await Test.createTestingModule({
            providers: [
                JobsService,
                {
                    provide: getRepositoryToken(Job),
                    useValue: mockRepo,
                }
            ],
        }).compile();

        service = module.get<JobsService>(JobsService);
        mockRepo = module.get(getRepositoryToken(Job));
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
        expect(mockRepo).toBeDefined();
    });

    describe('create', () => {
        test('valid properties, creates job', async () => {
            const job = await service.create(jobMock.name, jobMock.date);

            expect(job).toBeDefined();
            expect(job.id).toEqual(jobMock.id);
        });
    });

    describe('update', () => {
        test('existing job, updates it', async () => {
            vi.spyOn(mockRepo, 'findOneBy').mockResolvedValue(jobMock);
            vi.spyOn(mockRepo, 'save').mockImplementation((arg: any) => Promise.resolve(arg));
            const id = jobMock.id;
            const properties: Partial<Job> = {
                name: 'new-name',
            };

            const job = await service.update(id, properties);

            expect(job).toBeDefined();
            expect(job.name).toEqual(properties.name);
        });

        test('non-existent job with that id, throws NotFoundException', async () => {
            const id = 1000;
            const properties: Partial<Job> = {
                name: 'new-name',
            };

            await expect(service.update(id, properties)).rejects.toThrow(/not found/);
        });
    });

    describe('remove', () => {
        test('existing job, removes it', async () => {
            vi.spyOn(mockRepo, 'findOneBy').mockResolvedValue(jobMock);
            const id = jobMock.id;

            const employee = await service.remove(id);

            expect(employee).toBeDefined();
            expect(employee.id).toEqual(id);
        });

        test('non-existent job with that id, throws NotFoundException', async () => {
            const id = 1000;

            await expect(service.remove(id)).rejects.toThrow(/not found/);
        });
    });
});
