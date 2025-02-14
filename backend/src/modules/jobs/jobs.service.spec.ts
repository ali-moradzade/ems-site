import {afterAll, beforeEach, describe, expect, it, test} from "vitest";
import {Test, TestingModule} from '@nestjs/testing';
import {JobsService} from "./jobs.service";
import {ConfigModule, ConfigService} from "@nestjs/config";
import {Types} from "mongoose";
import {validate} from "../../env-validation";
import {DatabaseModule} from "../../common/database/database.module";
import {connectToTestDb, disconnectFromTestDb, dropTestDb} from "../../common/database/mongoose-test-helper";

describe('JobsService', () => {
    let service: JobsService;
    let configService: ConfigService;

    const title = 'Software Engineer';
    const description = 'A developer is required';
    const companyId = new Types.ObjectId().toString();
    const expirationDate = new Date();

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
                ConfigModule.forRoot({
                    isGlobal: true,
                    envFilePath: `.env.test`,
                    validate,
                }),
                DatabaseModule,
            ],
            providers: [
                JobsService,
            ],
        }).compile();

        service = module.get<JobsService>(JobsService);
        configService = module.get<ConfigService>(ConfigService);

        await connectToTestDb(configService);
    });

    beforeEach(async () => {
        await dropTestDb();
    });

    afterAll(async () => {
        await disconnectFromTestDb();
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    describe('create', () => {
        test('valid properties, creates job', async () => {
            const job = await service.create(title, description, companyId, expirationDate);

            expect(job).toBeDefined();
            expect(job.id).toBeDefined();
            expect(job.title).toEqual(title);
        });

        test('duplicate title, throws BadRequestException', async () => {
            await service.create(title, description, companyId, expirationDate);

            await expect(service.create(title, description, companyId, expirationDate)).rejects.toThrow(/already exists/);
        });
    });

    describe('remove', () => {
        test('existing job, removes it', async () => {
            const job = await service.create(title, description, companyId, expirationDate);

            await service.remove(job.id);
            const result = await service.findByTitle(title);

            expect(result).toBeNull();
        });

        test('non-existent job with that id, throws NotFoundException', async () => {
            const id = new Types.ObjectId().toString();

            await expect(service.remove(id)).rejects.toThrow(/not found/);
        });
    });
});
