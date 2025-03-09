import {afterAll, beforeEach, describe, expect, test, vi} from 'vitest';
import {Test, TestingModule} from '@nestjs/testing';
import {ConfigModule, ConfigService} from '@nestjs/config';
import {validate} from '../../env-validation';
import {AdminsService} from './admins.service';
import {AuthService} from '../auth/auth.service';
import {DatabaseModule} from '../../common/database/database.module';
import {connectToTestDb, disconnectFromTestDb, dropTestDb} from '../../common/database/mongoose-test-helper';
import {Types} from 'mongoose';

describe('Admin Service', () => {
    let service: AdminsService;
    let configService: ConfigService;
    let correctKey: string;

    const email = 'username';
    const password = 'very secure password';
    const name = 'admin';
    const superAdmin = false;

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
                AdminsService,
                {
                    provide: AuthService,
                    useValue: {
                        createJwtToken: vi.fn().mockReturnValue('fake-jwt-token'),
                    },
                },
            ],
        }).compile();

        service = module.get<AdminsService>(AdminsService);
        configService = module.get<ConfigService>(ConfigService);
        correctKey = configService.get<string>('SUPER_ADMIN_SECRET_KEY');
    });

    beforeEach(async () => {
        await connectToTestDb(configService);
        await dropTestDb();
    });

    afterAll(async () => {
        await disconnectFromTestDb();
    });

    test('creates service', () => {
        expect(service).toBeDefined();
    });

    describe('findOneByEmail', () => {
        test('no admins with that email, returns null', async () => {
            const email = 'non-existent@gmail.com';

            const result = await service.findByEmail(email);

            expect(result).toBeNull();
        });

        test('existing admins with that email, returns it', async () => {
            await service.signup(correctKey, email, password, name, superAdmin);

            const result = await service.findByEmail(email);

            expect(result).toBeDefined();
            expect(result.email).toEqual(email);
        });
    });

    describe('findOne', () => {
        test('no admins with that id, returns null', async () => {
            const id = new Types.ObjectId();

            const result = await service.findOne(id.toString());

            expect(result).toBeNull();
        });

        test('existing admin with that id, returns it', async () => {
            const admin = await service.signup(correctKey, email, password, name, superAdmin);

            const result = await service.findOne(admin.id);

            expect(result).toBeDefined();
            expect(result.email).toEqual(admin.email);
        });
    });

    describe('findAll', () => {
        test('several existing admins, returns them', async () => {
            const expectedLength = 2;

            await Promise.all([
                service.signup(correctKey, 'email1@gmail.com', password, name, superAdmin),
                service.signup(correctKey, 'email2@gmail.com', password, name, superAdmin),
            ]);

            const result = await service.findAll();

            expect(result.length).toEqual(expectedLength);
        });
    });

    describe('signup', () => {
        test('given admin properties, successfully signs up', async () => {
            const admin = await service.signup(correctKey, email, password, name, superAdmin);

            expect(admin.email).toEqual(email);
            expect(admin.superAdmin).toBe(false);
        });

        test('duplicate email, throws BadRequestException', async () => {
            await service.signup(correctKey, email, password, name, superAdmin);

            await expect(service.signup(correctKey, email, password, name, superAdmin))
                .rejects.toThrow(/already in use/);
        });

        test('given wrong secret key, throws ForbiddenException', async () => {
            const wrongKey = 'wrong-key';

            await expect(service.signup(wrongKey, email, password, name, superAdmin))
                .rejects.toThrow(/Invalid credentials/);
        });
    });

    describe('login', () => {
        test('given existing admin credentials, logs in', async () => {
            await service.signup(correctKey, email, password, name, superAdmin);

            const loginResult = await service.login(email, password);

            expect(loginResult).toBeDefined();
            expect(loginResult.token).toBeDefined();
            expect(loginResult.superAdmin).toBe(false);
        });

        test('existing admin, giving invalid credentials, throws UnauthorizedException', async () => {
            await service.signup(correctKey, email, password, name, superAdmin);

            await expect(service.login(email, 'not-admin-password')).rejects.toThrow(/Invalid credentials/);
        });

        test('non existing admin, throws UnauthorizedException', async () => {
            await expect(service.login(email, password)).rejects.toThrow(/Invalid credentials/);
        });
    });
});
