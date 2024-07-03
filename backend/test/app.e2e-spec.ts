import {Test, TestingModule} from '@nestjs/testing';
import {INestApplication, ValidationPipe} from '@nestjs/common';
import * as request from 'supertest';
import {AppModule} from '../src/app.module';
import {TypeOrmModule} from "@nestjs/typeorm";
import {Employee} from "../src/employees/employee.entity";
import {Job} from "../src/jobs/jobs.entity";

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
                    ],
                    synchronize: true,
                    dropSchema: true,
                }),
            ],
        }).compile();

        app = moduleFixture.createNestApplication();

        app.useGlobalPipes(new ValidationPipe({
            whitelist: true,
        }));

        await app.init();
    });

    describe('/employees', () => {
        it('POST / --> should create employee', async () => {
            const email = 'email@gmail.com';
            const password = 'a very unsecure password';
            const firstName = 'John';
            const lastName = 'Doe';
            const phone = '+9809123456789';
            const job = 'Graphic Designer';
            const date = '2022-10-11';

            return request(app.getHttpServer())
                .post('/employees')
                .send({
                    email, password, firstName,
                    lastName, phone, job, date
                })
                .expect(201)
                .then(res => {
                    expect(res.body.id).toBeDefined();
                    expect(res.body.email).toEqual(email)
                });
        });

        it('GET / --> should get all employees with specified email', async () => {
            const email = 'test@gmail.com';

            return request(app.getHttpServer())
                .get('/employees')
                .query({email})
                .expect(200)
                .then(res => {
                    const employees = res.body;

                    expect(employees).toBeDefined();
                    expect(employees.length).toEqual(0);
                });
        });
    });
});
