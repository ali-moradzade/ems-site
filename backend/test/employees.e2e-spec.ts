import {beforeEach, describe, expect, it, test} from "vitest";
import {INestApplication} from "@nestjs/common";
import {Test, TestingModule} from "@nestjs/testing";
import {AppModule} from "../src/app.module";
import request from "supertest";

describe('/employees', () => {
    let app: INestApplication;
    const path = '/employees';
    const mockEmployee = {
        email: 'email@gmail.com',
        firstName: 'John',
        lastName: 'Doe',
        phone: '+9809123456789',
        job: 'Graphic Designer',
        date: '2022-10-11',
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

