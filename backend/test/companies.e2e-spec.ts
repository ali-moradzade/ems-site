import {afterAll, beforeEach, describe, expect, test} from "vitest";
import {INestApplication} from "@nestjs/common";
import {Test, TestingModule} from "@nestjs/testing";
import {AppModule} from "../src/app.module";
import request from "supertest";
import {Types} from "mongoose";
import {ConfigService} from "@nestjs/config";
import {connectToTestDb, disconnectFromTestDb, dropTestDb} from "../src/common/database/mongoose-test-helper";

describe('/companies', () => {
    let app: INestApplication;
    let configService: ConfigService;
    const path = '/companies';
    const admin = {
        secretKey: '',
        email: 'admin@gmail.com',
        password: 'password',
        name: 'admin',
        superAdmin: false,
        token: '',
    };
    const mockCompany = {
        name: 'Software Company X',
        description: 'Presenting different software engineering services',
        logo: 'https://www.google.com/image',
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
        test('given company properties, creates it', async () => {
            const res = await request(app.getHttpServer())
                .post(path)
                .set('Authorization', `Bearer ${admin.token}`)
                .send(mockCompany);

            expect(res.statusCode).toEqual(201);
            expect(res.body.name).toEqual(mockCompany.name);
        });

        test('not giving valid admin token, throws UnauthorizedException', async () => {
            const res = await request(app.getHttpServer())
                .post(path)
                .send(mockCompany);

            expect(res.statusCode).toEqual(401);
            expect(res.body.message).toMatch(/Unauthorized/);
        });
    });

    describe('GET /', () => {
        test('no existing companies, returns []', async () => {
            const res = await request(app.getHttpServer())
                .get(path);

            expect(res.statusCode).toEqual(200);
            expect(res.body).toEqual([]);
        });

        test('several existing companies, returns them', async () => {
            const expectedCompanies = 2;
            await request(app.getHttpServer())
                .post(path)
                .set('Authorization', `Bearer ${admin.token}`)
                .send({
                    ...mockCompany,
                    name: 'name-01'
                });
            await request(app.getHttpServer())
                .post(path)
                .set('Authorization', `Bearer ${admin.token}`)
                .send({
                    ...mockCompany,
                    name: 'name-02'
                });

            const res = await request(app.getHttpServer())
                .get(path);

            expect(res.statusCode).toEqual(200);
            expect(res.body.length).toEqual(expectedCompanies);
        });
    });

    describe('GET /:id', () => {
        test('non-existing company, returns {}', async () => {
            const id = new Types.ObjectId().toString();
            const res = await request(app.getHttpServer())
                .get(`${path}/${id}`);

            expect(res.statusCode).toEqual(200);
            expect(res.body).toEqual({});
        });

        test('existing company, giving its id, returns it', async () => {
            const createdRes = await request(app.getHttpServer())
                .post(path)
                .set('Authorization', `Bearer ${admin.token}`)
                .send(mockCompany);
            const company = createdRes.body;

            const res = await request(app.getHttpServer())
                .get(`${path}/${company.id}`);

            expect(res.statusCode).toEqual(200);
            expect(res.body.name).toEqual(mockCompany.name);
        });
    });

    describe('DELETE /:id', () => {
        test('non-existing company, returns 404, Not Found', async () => {
            const id = new Types.ObjectId().toString();
            const res = await request(app.getHttpServer())
                .delete(`${path}/${id}`)
                .set('Authorization', `Bearer ${admin.token}`);

            expect(res.statusCode).toEqual(404);
            expect(res.body.error).toMatch(/Not Found/);
        });

        test('existing company, given company id, deletes the company', async () => {
            const createdRes = await request(app.getHttpServer())
                .post(path)
                .set('Authorization', `Bearer ${admin.token}`)
                .send(mockCompany);
            const company = createdRes.body;

            const res = await request(app.getHttpServer())
                .delete(`${path}/${company.id}`)
                .set('Authorization', `Bearer ${admin.token}`);

            expect(res.statusCode).toEqual(200);
            expect(res.body.title).toEqual(company.title);
        });

        test('not giving admin token, throws UnauthorizedException', async () => {
            const id = new Types.ObjectId().toString();

            const res = await request(app.getHttpServer())
                .delete(`${path}/${id}`);

            expect(res.status).toEqual(401);
            expect(res.body.message).toMatch(/Unauthorized/);
        });
    });
});
