import {beforeEach, describe, expect, test} from 'vitest';
import {Test, TestingModule} from '@nestjs/testing';
import {INestApplication} from '@nestjs/common';
import request from 'supertest';
import {AppModule} from '../src/app.module';


describe('/auth', () => {
    let app: INestApplication;
    const path = '/auth';
    const mockEmployee = {
        email: 'email@gmail.com',
        firstName: 'John',
        lastName: 'Doe',
        phone: '+9809123456789',
        job: 'Graphic Designer',
        date: '2022-10-11',
    };
    const mockUser = {
        email: 'email@gmail.com',
        password: 'a very strong password!',
        firstName: 'John',
        lastName: 'Doe',
    };

    beforeEach(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [
                AppModule,
            ],
        }).compile();

        app = moduleFixture.createNestApplication();
        await app.init();
    });

    describe('POST /signup', () => {
        test('given user properties, creates user', async () => {
            const res = await request(app.getHttpServer())
                .post(`${path}/signup`)
                .send(mockUser);

            expect(res.statusCode).toEqual(201);
            expect(res.body.id).toBeDefined();
            expect(res.body.email).toEqual(mockUser.email);
        });

        test('given duplicate email, should give 400, BadRequest', async () => {
            await request(app.getHttpServer())
                .post(`${path}/signup`)
                .send(mockUser)
                .expect(201);

            const res = await request(app.getHttpServer())
                .post(`${path}/signup`)
                .send(mockUser);

            expect(res.statusCode).toEqual(400);
            expect(res.body.message).toEqual('Email in use');
            expect(res.body.error).toMatch(/Bad Request/);
        });
    });

    describe('POST /login', () => {
        test('non-existent user, can not login', async () => {
            const res = await request(app.getHttpServer())
                .post(`${path}/login`)
                .send(mockUser);

            expect(res.statusCode).toEqual(404);
            expect(res.body.error).toMatch(/Not Found/);
        });

        test('existent-user, logs in', async () => {
            await request(app.getHttpServer())
                .post(`${path}/signup`)
                .send(mockUser)
                .expect(201);

            const res = await request(app.getHttpServer())
                .post(`${path}/login`)
                .send({email: mockUser.email, password: mockUser.password});

            expect(res.statusCode).toEqual(200);
            expect(res.body.token).toMatch(/ey/);
        });
    });

    describe('GET /', () => {
        test('no users in db, returns []', async () => {
            const email = 'test@gmail.com';

            const res = await request(app.getHttpServer())
                .get(path)
                .query({email});
            const employees = res.body;

            expect(employees).toBeDefined();
            expect(employees.length).toEqual(0);
        });

        test('one user with that email, returns it', async () => {
            const {email} = mockUser;
            await request(app.getHttpServer())
                .post(`${path}/signup`)
                .send(mockUser)
                .expect(201);

            const res = await request(app.getHttpServer())
                .get(path)
                .query({email});
            const users = res.body;

            expect(users.length).toEqual(1);
            expect(users[0].email).toEqual(email);
        });
    });

    describe('GET /:id', () => {
        test('no user with that id, returns empty object', async () => {
            const res = await request(app.getHttpServer())
                .get(`${path}/12345}`);

            expect(res.statusCode).toEqual(200);
            expect(res.body).toEqual({});
        });

        test('given existing user id, returns it', async () => {
            const createdRes = await request(app.getHttpServer())
                .post(`${path}/signup`)
                .send(mockUser)
                .expect(201);

            const user = createdRes.body;

            const res = await request(app.getHttpServer())
                .get(`${path}/${user.id}`);

            expect(res.statusCode).toEqual(200);
            expect(res.body.email).toEqual(mockUser.email);
        });
    });

    describe('DELETE /:id', () => {
        test('non-existent user id, returns 404, NotFound', async () => {
            const res = await request(app.getHttpServer())
                .delete(`${path}/12345`);

            expect(res.statusCode).toEqual(404);
            expect(res.body.error).toMatch(/Not Found/);
        });

        test('existent user id, successfully deletes it', async () => {
            const createdRes = await request(app.getHttpServer())
                .post(`${path}/signup`)
                .send(mockUser)
                .expect(201);
            const user = createdRes.body;

            const res = await request(app.getHttpServer())
                .delete(`${path}/${user.id}`);

            expect(res.body.email).toEqual(mockUser.email);
            expect(res.statusCode).toEqual(200);
        });
    });

    describe('PUT /:id', () => {
        test('user does not exist, returns 404, Not Found', async () => {
            const res = await request(app.getHttpServer())
                .put(`${path}/12345`)
                .send({
                    firstName: 'hello'
                });

            expect(res.statusCode).toEqual(404);
            expect(res.body.error).toMatch(/Not Found/);
        });

        test('existing user, given new properties, updates user', async () => {
            const createdRes = await request(app.getHttpServer())
                .post(`${path}/signup`)
                .send(mockUser);
            const user = createdRes.body;
            const newFirstName = 'New First Name';

            const res = await request(app.getHttpServer())
                .put(`${path}/${user.id}`)
                .send({
                    firstName: newFirstName,
                });

            expect(res.statusCode).toEqual(200);
            expect(res.body.firstName).toEqual(newFirstName);
        });
    });
});
