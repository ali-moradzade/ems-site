import {beforeEach, describe, expect, test} from "vitest";
import {Test, TestingModule} from '@nestjs/testing';
import {AuthService} from './auth.service';
import {UsersService} from "./users.service";
import {User} from "./user.entity";
import {BadRequestException, NotFoundException} from "@nestjs/common";

describe('AuthService', () => {
    let service: AuthService;
    let fakeUsersService: Partial<UsersService>;

    const mockUser = {
        email: 'mock@mock.com',
        password: 'mockedPassword239723',
        firstName: 'mockFirstName',
        lastName: 'mockLastName',
    };

    beforeEach(async () => {
        const users: User[] = [];
        fakeUsersService = {
            find(email: string): Promise<User[]> {
                const filteredUsers = users.filter(user => user.email === email);
                return Promise.resolve(filteredUsers);
            },
            async create(email: string, password: string, firstName: string, lastName: string): Promise<User> {
                const user = {
                    id: Math.floor(Math.random() * 99999),
                    email, password, firstName, lastName,
                };

                users.push(user);
                return Promise.resolve(user);
            }
        };

        const module: TestingModule = await Test.createTestingModule({
            providers: [
                AuthService,
                {
                    provide: UsersService,
                    useValue: fakeUsersService,
                }
            ],
        }).compile();

        service = module.get<AuthService>(AuthService);
    });

    test('creates an instance of service', () => {
        expect(service).toBeDefined();
    });

    describe('signup', () => {
        test('given user properties, creates user with salted and hashed password', async () => {
            const {email, password, firstName, lastName} = mockUser;

            const user = await service.signup(email, password, firstName, lastName);
            const [salt, hash] = user.password.split('.');

            expect(user).toBeDefined();
            expect(user.password).not.toEqual(password);
            expect(salt).toBeDefined();
            expect(hash).toBeDefined();
        });

        test('duplicate email, throws error: BadRequestException', async () => {
            const {email, password, firstName, lastName} = mockUser;

            await service.signup(email, password, firstName, lastName);

            await expect(service.signup(email, password, firstName, lastName)).rejects.toThrow(BadRequestException);
        });
    });

    describe('login', () => {
        test('given user credentials, logins the user', async () => {
            const {email, password, firstName, lastName} = mockUser;

            await service.signup(email, password, firstName, lastName);
            const token = await service.login(email, password);

            expect(token).toBeDefined();
            expect(token).toBeTypeOf('string');
        });

        test('user not signed up, throws error: NotFoundException', async () => {
            const {email, password} = mockUser;

            await expect(service.login(email, password)).rejects.toThrow(NotFoundException);
        });

        test('invalid credentials, throws error: BadRequestException', async () => {
            const {email, password, firstName, lastName} = mockUser;

            await service.signup(email, password, firstName, lastName);

            await expect(service.login(email, 'some invalid password')).rejects.toThrow(BadRequestException);
        });
    });
});
