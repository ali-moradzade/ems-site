import {afterAll, beforeEach, describe, expect, test} from "vitest";
import {INestApplication} from "@nestjs/common";
import {Test, TestingModule} from "@nestjs/testing";
import {AppModule} from "../src/app.module";
import request from "supertest";
import {Types} from "mongoose";
import {ConfigService} from "@nestjs/config";
import {connectToTestDb, disconnectFromTestDb, dropTestDb} from "../src/common/database/mongoose-test-helper";

describe('/jobs', () => {
    let app: INestApplication;
    let configService: ConfigService;
    const path = '/jobs';
    const admin = {
        secretKey: '',
        email: 'admin@gmail.com',
        password: 'password',
        name: 'admin',
        superAdmin: false,
        token: '',
    };
    const mockJob = {
        title: 'Software Engineer',
        description: 'An experienced software engineer is required',
        companyId: new Types.ObjectId().toString(),
        expirationDate: new Date(),
    };

    beforeEach(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [
                AppModule,
            ],
        }).compile();

        app = moduleFixture.createNestApplication();

        configService = moduleFixture.get<ConfigService>(ConfigService);
        admin.secretKey = configService.get<string>('SUPER_ADMIN_SECRET_KEY');

        await app.init();
    });

    beforeEach(async () => {
        await connectToTestDb(configService);
        await dropTestDb();
        await request(app.getHttpServer())
            .post(`/admins/signup`)
            .send(admin)
            .expect(201);

        const adminRes = await request(app.getHttpServer())
            .post(`/admins/login`)
            .send({
                email: admin.email,
                password: admin.password,
            })
            .expect(200);

        expect(adminRes.body.token).toBeDefined();
        admin.token = adminRes.body.token;
    });

    afterAll(async () => {
        await disconnectFromTestDb();
    });

    describe('POST /', () => {
        test('given job properties, creates it', async () => {
            const res = await request(app.getHttpServer())
                .post(path)
                .set('Authorization', `Bearer ${admin.token}`)
                .send(mockJob);

            expect(res.statusCode).toEqual(201);
            expect(res.body.title).toEqual(mockJob.title);
        });

        test('not giving valid admin token, throws UnauthorizedException', async () => {
            const res = await request(app.getHttpServer())
                .post(path)
                .send(mockJob);

            expect(res.statusCode).toEqual(401);
            expect(res.body.message).toMatch(/Unauthorized/);
        });
    });

    describe('GET /', () => {
        test('no existing job, returns []', async () => {
            const res = await request(app.getHttpServer())
                .get(path);

            expect(res.statusCode).toEqual(200);
            expect(res.body).toEqual([]);
        });

        test('several existing jobs, returns them', async () => {
            const expectedJobs = 2;
            await request(app.getHttpServer())
                .post(path)
                .set('Authorization', `Bearer ${admin.token}`)
                .send({
                    ...mockJob,
                    title: 'title1'
                });
            await request(app.getHttpServer())
                .post(path)
                .set('Authorization', `Bearer ${admin.token}`)
                .send({
                    ...mockJob,
                    title: 'title2'
                });

            const res = await request(app.getHttpServer())
                .get(path);

            expect(res.statusCode).toEqual(200);
            expect(res.body.length).toEqual(expectedJobs);
        });
    });

    describe('GET /:id', () => {
        test('no existing job, returns {}', async () => {
            const id = new Types.ObjectId().toString();
            const res = await request(app.getHttpServer())
                .get(`${path}/${id}`);

            expect(res.statusCode).toEqual(200);
            expect(res.body).toEqual({});
        });

        test('existing job, giving its id, returns it', async () => {
            const createdRes = await request(app.getHttpServer())
                .post(path)
                .set('Authorization', `Bearer ${admin.token}`)
                .send(mockJob);
            const job = createdRes.body;

            const res = await request(app.getHttpServer())
                .get(`${path}/${job.id}`);

            expect(res.statusCode).toEqual(200);
            expect(res.body.title).toEqual(mockJob.title);
        });
    });

    describe('DELETE /:id', () => {
        test('no existing job, returns 404, Not Found', async () => {
            const id = new Types.ObjectId().toString();
            const res = await request(app.getHttpServer())
                .delete(`${path}/${id}`)
                .set('Authorization', `Bearer ${admin.token}`);

            expect(res.statusCode).toEqual(404);
            expect(res.body.error).toMatch(/Not Found/);
        });

        test('existing job, given job id, deletes the job', async () => {
            const createdRes = await request(app.getHttpServer())
                .post(path)
                .set('Authorization', `Bearer ${admin.token}`)
                .send(mockJob);
            const job = createdRes.body;

            const res = await request(app.getHttpServer())
                .delete(`${path}/${job.id}`)
                .set('Authorization', `Bearer ${admin.token}`);

            expect(res.statusCode).toEqual(200);
            expect(res.body.title).toEqual(job.title);
        });

        test('not giving admin token, throws UnauthorizedException', async () => {
            const id = new Types.ObjectId().toString();

            const res = await request(app.getHttpServer())
                .delete(`${path}/${id}`)

            expect(res.status).toEqual(401);
            expect(res.body.message).toMatch(/Unauthorized/);
        })
    });
});
