import {beforeEach, describe, expect, test, vi} from "vitest";
import {Test, TestingModule} from '@nestjs/testing';
import {AuthService} from './auth.service';
import {UsersService} from "./users.service";
import {User} from "./user.entity";
import {BadRequestException, NotFoundException} from "@nestjs/common";
import {JwtService} from "@nestjs/jwt";

describe('AuthService', () => {
    let service: AuthService;
    let usersServiceMock: Partial<UsersService>;

    const userMock = {
        email: 'mock@gmail.com',
        password: 'mockedPassword239723',
        firstName: 'mockFirstName',
        lastName: 'mockLastName',
    };

    beforeEach(async () => {
        const users: User[] = [];
        usersServiceMock = {
            find: vi.fn().mockImplementation((email: string): Promise<User[]> => {
                const filteredUsers = users.filter(user => user.email === email);
                return Promise.resolve(filteredUsers);
            }),
            create: vi.fn().mockImplementation((email: string, password: string, firstName: string, lastName: string): Promise<User> => {
                const user = {
                    id: Math.floor(Math.random() * 99999),
                    email, password, firstName, lastName,
                };

                users.push(user);
                return Promise.resolve(user);
            }),
        };

        const module: TestingModule = await Test.createTestingModule({
            providers: [
                AuthService,
                {
                    provide: JwtService,
                    useValue: {
                        sign: vi.fn().mockReturnValue('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MjIxNTUsImV')
                    }
                },
                {
                    provide: UsersService,
                    useValue: usersServiceMock,
                }
            ],
        }).compile();

        service = module.get<AuthService>(AuthService);
    });

    test('creates an instance of service', () => {
        expect(service).toBeDefined();
    });

    describe('signup', () => {
        test('given user properties, creates user with hashed password', async () => {
            const {email, password, firstName, lastName} = userMock;

            const user = await service.signup(email, password, firstName, lastName);

            expect(user).toBeDefined();
            expect(user.password).not.toEqual(password);
        });

        test('duplicate email, throws BadRequestException', async () => {
            const {email, password, firstName, lastName} = userMock;

            await service.signup(email, password, firstName, lastName);

            expect(usersServiceMock.create).toHaveBeenCalledOnce();
            await expect(service.signup(email, password, firstName, lastName)).rejects.toThrow(BadRequestException);
        });
    });

    describe('login', () => {
        test('given user credentials, logins the user', async () => {
            const {email, password, firstName, lastName} = userMock;

            await service.signup(email, password, firstName, lastName);
            const {token} = await service.login(email, password);

            expect(token).toBeDefined();
            expect(token).toBeTypeOf('string');
        });

        test('user not signed up, throws error: NotFoundException', async () => {
            const {email, password} = userMock;

            await expect(service.login(email, password)).rejects.toThrow(NotFoundException);
        });

        test('invalid credentials, throws error: UnauthorizedException', async () => {
            const {email, password, firstName, lastName} = userMock;

            await service.signup(email, password, firstName, lastName);

            await expect(service.login(email, 'invalid-password')).rejects.toThrow(/Invalid credentials/);
        });
    });
});
