import {beforeEach, describe, expect, test, vi} from 'vitest';
import {Test, TestingModule} from '@nestjs/testing';
import {UsersService} from './users.service';
import {Repository} from "typeorm";
import {User} from "./user.entity";
import {getRepositoryToken} from "@nestjs/typeorm";
import {BadRequestException} from '@nestjs/common';

describe('UsersService', () => {
    let service: UsersService;
    let repositoryMock: Partial<Repository<User>>;

    const userMock = {
        id: 1,
        email: 'mock@mock.com',
        password: 'mockedPassword239723',
        firstName: 'mockFirstName',
        lastName: 'mockLastName',
    };

    beforeEach(async () => {
        repositoryMock = {
            findOneBy: vi.fn().mockResolvedValue(null),
            findBy: vi.fn().mockResolvedValue([]),
            create: vi.fn(),
            save: vi.fn(),
        };

        const module: TestingModule = await Test.createTestingModule({
            providers: [
                UsersService,
                {
                    provide: getRepositoryToken(User),
                    useValue: repositoryMock,
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
            vi.spyOn(repositoryMock, 'create').mockReturnValue(userMock);
            vi.spyOn(repositoryMock, 'save').mockResolvedValue(userMock);
            const {email, password, firstName, lastName} = userMock;

            const user = await service.create(email, password, firstName, lastName);

            expect(user).toBeDefined();
            expect(user.email).toEqual(email);
        });

        test('creating user with duplicate email, throws error', async () => {
            vi.spyOn(repositoryMock, 'findBy').mockResolvedValue([userMock]);
            const {email, password, firstName, lastName} = userMock;

            await expect(service.create(email, password, firstName, lastName)).rejects.toThrow(BadRequestException);
        });
    });

    describe('update', () => {
        test('existing user, updates it', async () => {
            vi.spyOn(repositoryMock, 'findOneBy').mockResolvedValue(userMock);
            vi.spyOn(repositoryMock, 'save').mockImplementation((user: any) => Promise.resolve(user));
            const id = userMock.id;
            const attrs = {
                firstName: 'new-firstName'
            };

            const user = await service.update(id, attrs);

            expect(user).toBeDefined();
            expect(user.firstName).toEqual(attrs.firstName);
        });

        test('non-existing user, throws NotFoundException', async () => {
            vi.spyOn(repositoryMock, 'findOneBy').mockResolvedValue(null);
            const id = userMock.id;
            const attrs = {
                firstName: 'new-firstName'
            };

            await expect(service.update(id, attrs)).rejects.toThrow(/not found/);
        })
    });
});
