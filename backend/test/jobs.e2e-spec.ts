import {beforeEach, describe, expect, test} from "vitest";
import {INestApplication} from "@nestjs/common";
import {Test, TestingModule} from "@nestjs/testing";
import {AppModule} from "../src/app.module";
import request from "supertest";

describe('/jobs', () => {
    let app: INestApplication;
    const path = '/jobs';
    const mockJob = {
        name: 'Graphic Designer',
        date: '2023-12-08',
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
        test('given the job, creates it', async () => {
            const res = await request(app.getHttpServer())
                .post(path)
                .send(mockJob);

            expect(res.statusCode).toEqual(201);
            expect(res.body.name).toEqual(mockJob.name);
        });
    });

    describe('GET /', () => {
        test('no existing job, given job name, returns []', async () => {
            const res = await request(app.getHttpServer())
                .get(path);

            expect(res.statusCode).toEqual(200);
            expect(res.body).toEqual([]);
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
        test('no existing job, returns empty object', async () => {
            const res = await request(app.getHttpServer())
                .get(`${path}/12345`);

            expect(res.statusCode).toEqual(200);
            expect(res.body).toEqual({});
        });

        test('with existing job, given job id, returns that job', async () => {
            const createdRes = await request(app.getHttpServer())
                .post(path)
                .send(mockJob)
                .expect(201);
            const job = createdRes.body;

            const res = await request(app.getHttpServer())
                .get(`${path}/${job.id}`);

            expect(res.statusCode).toEqual(200);
            expect(res.body.name).toEqual(mockJob.name);
        });
    });

    describe('DELETE /:id', () => {
        test('no existing job, returns 404, Not Found', async () => {
            const res = await request(app.getHttpServer())
                .delete(`${path}/12345`);

            expect(res.statusCode).toEqual(404);
            expect(res.body.error).toMatch(/Not Found/);
        });

        test('existing job, given job id, deletes the job', async () => {
            const createdRes = await request(app.getHttpServer())
                .post(path)
                .send(mockJob)
                .expect(201);
            const job = createdRes.body;

            const res = await request(app.getHttpServer())
                .delete(`${path}/${job.id}`);

            expect(res.statusCode).toEqual(200);
            expect(res.body.name).toEqual(job.name);
        });
    });

    describe('PUT /:id', () => {
        test('given no job with that id, returns 404, Not Found', async () => {
            const res = await request(app.getHttpServer())
                .put(`${path}/12345`)
                .send({name: 'hello'});

            expect(res.statusCode).toEqual(404);
            expect(res.body.error).toMatch(/Not Found/);
        });

        test('existing job, updates the job', async () => {
            const createdRes = await request(app.getHttpServer())
                .post(path)
                .send(mockJob)
                .expect(201);
            const job = createdRes.body;
            const newName = 'Web Designer';

            const res = await request(app.getHttpServer())
                .put(`${path}/${job.id}`)
                .send({
                    name: newName,
                });

            expect(res.statusCode).toEqual(200);
            expect(res.body.name).toEqual(newName);
        });
    });
});
