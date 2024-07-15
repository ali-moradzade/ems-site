import {beforeEach, describe, expect, it, test} from 'vitest';
import {Test, TestingModule} from '@nestjs/testing';
import {INestApplication, ValidationPipe} from '@nestjs/common';
import request from 'supertest';
import {AppModule} from '../src/app.module';
import {TypeOrmModule} from "@nestjs/typeorm";
import {Employee} from "../src/employees/employee.entity";
import {Job} from "../src/jobs/jobs.entity";
import {User} from "../src/users/user.entity";

const cookieSession = require('cookie-session');

const mockEmployee = {
    email: 'email@gmail.com',
    firstName: 'John',
    lastName: 'Doe',
    phone: '+9809123456789',
    job: 'Graphic Designer',
    date: '2022-10-11',
};

const mockJob = {
    name: 'Graphic Designer',
    date: '2023-12-08',
};

describe('AppController (e2e)', () => {
    let app: INestApplication;

    beforeEach(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [
                AppModule,
                TypeOrmModule.forRoot({
                    type: 'sqlite',
                    database: 'db.sqlite',
                    entities: [
                        Employee,
                        Job,
                        User,
                    ],
                    synchronize: true,
                    // Wipes the db
                    dropSchema: true,
                }),
            ],
        }).compile();

        app = moduleFixture.createNestApplication();

        await app.init();
    });

    describe('/employees', () => {
        const path = '/employees';

        describe('POST /', () => {
            it('given employee properties, should create employee', async () => {
                const {email} = mockEmployee;

                const res = await request(app.getHttpServer())
                    .post(path)
                    .send(mockEmployee);

                expect(res.statusCode).toEqual(201);
                expect(res.body.id).toBeDefined();
                expect(res.body.email).toEqual(email);
            });

            test('given duplicate email, should give 400, BadRequest', async () => {
                // Create First User
                await request(app.getHttpServer())
                    .post(path)
                    .send(mockEmployee)
                    .expect(201);

                // Try to create user with same email
                return request(app.getHttpServer())
                    .post(path)
                    .send(mockEmployee)
                    .expect(400)
                    .then(res => {
                        expect(res.body.message).toEqual('Email in use');
                        expect(res.body.error).toMatch(/Bad Request/);
                    });
            });
        });

        describe('GET /', () => {
            test('no employees in db, returns []', async () => {
                const email = 'test@gmail.com';

                const res = await request(app.getHttpServer())
                    .get(path)
                    .query({email});
                const employees = res.body;

                expect(employees).toBeDefined();
                expect(employees.length).toEqual(0);
            });

            test('one employee with that email, returns it', async () => {
                const {email} = mockEmployee;

                // Create employee
                await request(app.getHttpServer())
                    .post(path)
                    .send(mockEmployee)
                    .expect(201);

                const res = await request(app.getHttpServer())
                    .get('/employees')
                    .query({email});
                const employees = res.body;

                expect(employees.length).toEqual(1);
                expect(employees[0].email).toEqual(email);
            });
        });

        describe('GET /:id', () => {
            test('not employee with that id, returns 404, NotFound', async () => {
                return request(app.getHttpServer())
                    .get(`${path}/12345}`)
                    .expect(404)
                    .then(res => expect(res.body.error).toMatch(/Not Found/));
            });

            test('given existing employee id, returns it', async () => {
                // Create user
                const createdRes = await request(app.getHttpServer())
                    .post(path)
                    .send(mockEmployee);

                const employee = createdRes.body;

                const res = await request(app.getHttpServer())
                    .get(`${path}/${employee.id}`);

                expect(res.statusCode).toEqual(200);
                expect(res.body.email).toEqual(mockEmployee.email);
            });
        });

        describe('DELETE /:id', () => {
            test('non-existent employee id, returns 404, NotFound', async () => {
                return request(app.getHttpServer())
                    .delete(`${path}/12345`)
                    .expect(404)
                    .then(res => expect(res.body.error).toMatch(/Not Found/));
            });

            test('existent employee id, successfully deletes it', async () => {
                const createdRes = await request(app.getHttpServer())
                    .post(path)
                    .send(mockEmployee)
                    .expect(201);
                const employee = createdRes.body;

                const res = await request(app.getHttpServer())
                    .delete(`${path}/${employee.id}`);

                expect(res.body.email).toEqual(mockEmployee.email);
                expect(res.statusCode).toEqual(200);
            });
        });

        describe('PATCH /:id', () => {
            test('employee does not exist, returns 404, Not Found', async () => {
                return request(app.getHttpServer())
                    .patch(`${path}/12345`)
                    .send({
                        firstName: 'hello'
                    })
                    .expect(404)
                    .then(res => expect(res.body.error).toMatch(/Not Found/));
            });

            test('employee exists, and giving employee firstName, updates employee firstName', async () => {
                const createdRes = await request(app.getHttpServer())
                    .post(path)
                    .send(mockEmployee);
                const employee = createdRes.body;
                const newFirstName = 'New First Name';

                const res = await request(app.getHttpServer())
                    .patch(`${path}/${employee.id}`)
                    .send({
                        firstName: newFirstName,
                    });

                expect(res.statusCode).toEqual(200);
                expect(res.body.firstName).toEqual(newFirstName);
            });
        });
    });

    describe('/jobs', () => {
        const path = '/jobs';

        describe('POST /', () => {
            test('given the job, creates it', async () => {
                return request(app.getHttpServer())
                    .post(path)
                    .send(mockJob)
                    .expect(201)
                    .then(res => expect(res.body.name).toEqual(mockJob.name));
            });
        });

        describe('GET /', () => {
            test('no existing job, given job name, returns []', async () => {
                return request(app.getHttpServer())
                    .get(path)
                    .expect(200)
                    .then(res => expect(res.body).toEqual([]));
            });

            test('with existing job, given job name, returns job with that name', async () => {
                await request(app.getHttpServer())
                    .post(path)
                    .send(mockJob)
                    .expect(201);
                const {name} = mockJob;

                const res = await request(app.getHttpServer())
                    .get(path)
                    .query({name});

                expect(res.statusCode).toEqual(200);
                expect(res.body.length).toEqual(1);
                expect(res.body[0].name).toEqual(name);
            });
        });

        describe('GET /:id', () => {
            test('no existing job, returns 404, Not Found', async () => {
                return request(app.getHttpServer())
                    .get(`${path}/12345`)
                    .expect(404)
                    .then(res => expect(res.body.error).toMatch(/Not Found/));
            });

            test('with existing job, given job id, returns that job', async () => {
                const createdRes = await request(app.getHttpServer())
                    .post(path)
                    .send(mockJob);
                const job = createdRes.body;

                return request(app.getHttpServer())
                    .get(`${path}/${job.id}`)
                    .expect(200)
                    .then(res => expect(res.body.name).toEqual(mockJob.name));
            });
        });

        describe('DELETE /:id', () => {
            test('not existing job, returns 404, Not Found', async () => {
                return request(app.getHttpServer())
                    .delete(`${path}/12345`)
                    .expect(404)
                    .then(res => expect(res.body.error).toMatch(/Not Found/));
            });

            test('existing job, given job id, deletes the job', async () => {
                const createdRes = await request(app.getHttpServer())
                    .post(path)
                    .send(mockJob);
                const job = createdRes.body;

                const res = await request(app.getHttpServer())
                    .delete(`${path}/${job.id}`);

                expect(res.statusCode).toEqual(200);
                expect(res.body.name).toEqual(job.name);
            });
        });

        describe('PATCH /:id', () => {
            test('given no job with that id, returns 404, Not Found', async () => {
                return request(app.getHttpServer())
                    .patch(`${path}/12345`)
                    .send({name: 'hello'})
                    .expect(404)
                    .then(res => expect(res.body.error).toMatch(/Not Found/));
            });

            test('existing job, updates the job', async () => {
                const createdRes = await request(app.getHttpServer())
                    .post(path)
                    .send(mockJob);
                const job = createdRes.body;
                const newName = 'Web Designer';

                const res = await request(app.getHttpServer())
                    .patch(`${path}/${job.id}`)
                    .send({
                        name: newName,
                    });

                expect(res.statusCode).toEqual(200);
                expect(res.body.name).toEqual(newName);
            });
        });
    });

    describe('/auth', () => {
        const path = '/auth';

        const mockUser = {
            email: 'email@gmail.com',
            password: 'a very strong password!',
            firstName: 'John',
            lastName: 'Doe',
        };

        describe('POST /signup', () => {
            test('given user properties, should create user', async () => {
                const res = await request(app.getHttpServer())
                    .post(`${path}/signup`)
                    .send(mockUser);

                expect(res.statusCode).toEqual(201);
                expect(res.body.id).toBeDefined();
                expect(res.body.email).toEqual(mockUser.email);
            });

            test('given duplicate email, should give 400, BadRequest', async () => {
                // Create First User
                await request(app.getHttpServer())
                    .post(`${path}/signup`)
                    .send(mockUser)
                    .expect(201);

                // Try to create user with same email
                return request(app.getHttpServer())
                    .post(`${path}/signup`)
                    .send(mockUser)
                    .expect(400)
                    .then(res => {
                        expect(res.body.message).toEqual('Email in use');
                        expect(res.body.error).toMatch(/Bad Request/);
                    });
            });
        });

        describe('POST /login', () => {
            test('non-existent user, can not login', async () => {
                return request(app.getHttpServer())
                    .post(`${path}/login`)
                    .send(mockUser)
                    .expect(404)
                    .then(res => expect(res.body.error).toMatch(/Not Found/));
            });

            test('existent-user, logs in', async () => {
                // Create User
                await request(app.getHttpServer())
                    .post(`${path}/signup`)
                    .send(mockUser)
                    .expect(201);

                // Login user
                return request(app.getHttpServer())
                    .post(`${path}/login`)
                    .send({email: mockUser.email, password: mockUser.password})
                    .expect(200)
                    .then(res => {
                        expect(res.body.email).toEqual(mockEmployee.email);
                    });
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

                // Create employee
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
            test('no user with that id, returns 404, NotFound', async () => {
                return request(app.getHttpServer())
                    .get(`${path}/12345}`)
                    .expect(404)
                    .then(res => expect(res.body.error).toMatch(/Not Found/));
            });

            test('given existing user id, returns it', async () => {
                // Create user
                const createdRes = await request(app.getHttpServer())
                    .post(`${path}/signup`)
                    .send(mockUser);

                const user = createdRes.body;

                const res = await request(app.getHttpServer())
                    .get(`${path}/${user.id}`);

                expect(res.statusCode).toEqual(200);
                expect(res.body.email).toEqual(mockUser.email);
            });
        });

        describe('DELETE /:id', () => {
            test('non-existent user id, returns 404, NotFound', async () => {
                return request(app.getHttpServer())
                    .delete(`${path}/12345`)
                    .expect(404)
                    .then(res => expect(res.body.error).toMatch(/Not Found/));
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

        describe('PATCH /:id', () => {
            test('user does not exist, returns 404, Not Found', async () => {
                return request(app.getHttpServer())
                    .patch(`${path}/12345`)
                    .send({
                        firstName: 'hello'
                    })
                    .expect(404)
                    .then(res => expect(res.body.error).toMatch(/Not Found/));
            });

            test('user exists, and giving user firstName, updates user firstName', async () => {
                const createdRes = await request(app.getHttpServer())
                    .post(`${path}/signup`)
                    .send(mockUser);
                const user = createdRes.body;
                const newFirstName = 'New First Name';

                const res = await request(app.getHttpServer())
                    .patch(`${path}/${user.id}`)
                    .send({
                        firstName: newFirstName,
                    });

                expect(res.statusCode).toEqual(200);
                expect(res.body.firstName).toEqual(newFirstName);
            });
        });
    });
});
