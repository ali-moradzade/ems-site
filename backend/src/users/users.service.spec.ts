import {beforeEach, describe, expect, test} from 'vitest';
import {Test, TestingModule} from '@nestjs/testing';
import {UsersService} from './users.service';
import {Repository} from "typeorm";
import {User} from "./user.entity";
import {getRepositoryToken} from "@nestjs/typeorm";
import {AppModule} from "../app.module";
import {BadRequestException} from '@nestjs/common';

describe('UsersService', () => {
    let service: UsersService;

    const mockUser = {
        email: 'mock@mock.com',
        password: 'mockedPassword239723',
        firstName: 'mockFirstName',
        lastName: 'mockLastName',
    };

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
                AppModule,
            ],
            providers: [
                UsersService,
                {
                    provide: getRepositoryToken(User),
                    useClass: Repository,
                }
            ],
        }).compile();

        service = module.get<UsersService>(UsersService);
    });

    test('creates users service', () => {
        expect(service).toBeDefined();
    });

    describe('create', () => {
        test('given user properties, creates user', async () => {
            const {email, password, firstName, lastName} = mockUser;

            const user = await service.create(email, password, firstName, lastName);

            expect(user).toBeDefined();
            expect(user.email).toEqual(email);
        });

        test('creating user with duplicate email, throws error', async () => {
            const {email, password, firstName, lastName} = mockUser;

            await service.create(email, password, firstName, lastName);

            await expect(service.create(email, password, firstName, lastName)).rejects.toThrow(BadRequestException);
        });
    });

    describe('findOne', () => {
        test('no users, returns null', async () => {
            const user = await service.findOne(1);

            expect(user).toBeNull()
        });

        test('user with that id exists, returns it', async () => {
            const {email, password, firstName, lastName} = mockUser;

            const user = await service.create(email, password, firstName, lastName);
            const result = await service.findOne(user.id);

            expect(user.email).toEqual(result.email)
            expect(user.firstName).toEqual(result.firstName)
        })
    });
});
