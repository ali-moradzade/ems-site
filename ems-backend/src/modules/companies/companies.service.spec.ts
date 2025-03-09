import {afterAll, beforeEach, describe, expect, it, test} from "vitest";
import {Test, TestingModule} from '@nestjs/testing';
import {CompaniesService} from './companies.service';
import {ConfigModule, ConfigService} from "@nestjs/config";
import {DatabaseModule} from "../../common/database/database.module";
import {validate} from "../../env-validation";
import {connectToTestDb, disconnectFromTestDb, dropTestDb} from "../../common/database/mongoose-test-helper";
import {Types} from "mongoose";

describe('EmployeesService', () => {
    let service: CompaniesService;
    let configService: ConfigService;

    const name = 'company';
    const description = 'software development company';
    const logo = 'https://www.google.com/image';

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
                await ConfigModule.forRoot({
                    isGlobal: true,
                    envFilePath: `.env.test`,
                    validate,
                }),
                DatabaseModule,
            ],
            providers: [
                CompaniesService,
            ],
        }).compile();

        service = module.get<CompaniesService>(CompaniesService);
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
        test('valid properties, creates company', async () => {
            const company = await service.create(name, description, logo);

            expect(company).toBeDefined();
            expect(company.id).toBeDefined();
        });

        test('existing company with that name, throws BadRequestException', async () => {
            await service.create(name, description, logo);

            await expect(service.create(name, description, logo)).rejects.toThrow(/already exists/);
        });
    });


    describe('remove', () => {
        test('existing company, removes it', async () => {
            const company = await service.create(name, description, logo);

            await service.remove(company.id);
            const result = await service.findOne(company.id);

            expect(result).toBeNull();
        });

        test('non-existent company with that id, throws NotFoundException', async () => {
            const id = new Types.ObjectId().toString();

            await expect(service.remove(id)).rejects.toThrow(/not found/);
        });
    });
});
