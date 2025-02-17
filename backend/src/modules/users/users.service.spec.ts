import {afterAll, beforeEach, describe, expect, test, vi} from 'vitest';
import {Test, TestingModule} from '@nestjs/testing';
import {UsersService} from './users.service';
import {BadRequestException, UnauthorizedException} from '@nestjs/common';
import {ConfigModule, ConfigService} from "@nestjs/config";
import {validate} from "../../env-validation";
import {DatabaseModule} from "../../common/database/database.module";
import {AuthService} from "../auth/auth.service";
import {connectToTestDb, disconnectFromTestDb, dropTestDb} from "../../common/database/mongoose-test-helper";

describe('UsersService', () => {
    let service: UsersService;
    let configService: ConfigService;

    const email = 'mock@mock.com';
    const password = 'mockedPassword239723';
    const firstName = 'mockFirstName';
    const lastName = 'mockLastName';

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
                UsersService,
                {
                    provide: AuthService,
                    useValue: {
                        createJwtToken: vi.fn().mockReturnValue('fake-jwt-token'),
                    },
                },
            ],
        }).compile();

        service = module.get<UsersService>(UsersService);
        configService = module.get<ConfigService>(ConfigService);

        await connectToTestDb(configService);
    });

    beforeEach(async () => {
        await dropTestDb();
    });

    afterAll(async () => {
        await disconnectFromTestDb();
    });

    test('creates users service', () => {
        expect(service).toBeDefined();
    });

    describe('signup', () => {
        test('given user properties, creates user with hashed password', async () => {
            const user = await service.signup(email, password, firstName, lastName);

            expect(user).toBeDefined();
            expect(user.password).not.toEqual(password);
        });

        test('duplicate email, throws BadRequestException', async () => {
            await service.signup(email, password, firstName, lastName);

            await expect(service.signup(email, password, firstName, lastName)).rejects.toThrow(BadRequestException);
        });
    });

    describe('login', () => {
        test('given user credentials, logins the user', async () => {
            await service.signup(email, password, firstName, lastName);

            const {token} = await service.login(email, password);

            expect(token).toBeDefined();
            expect(token).toBeTypeOf('string');
        });

        test('user not signed up, throws UnauthorizedException', async () => {
            await expect(service.login(email, password)).rejects.toThrow(UnauthorizedException);
        });

        test('invalid credentials, throws error: UnauthorizedException', async () => {
            await service.signup(email, password, firstName, lastName);

            await expect(service.login(email, 'invalid-password')).rejects.toThrow(/Invalid credentials/);
        });
    });
});
