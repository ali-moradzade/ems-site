import {afterAll, beforeEach, describe, expect, test} from "vitest";
import {INestApplication} from "@nestjs/common";
import {Test, TestingModule} from "@nestjs/testing";
import {AppModule} from "../src/app.module";
import request from "supertest";
import {ConfigService} from "@nestjs/config";
import {connectToTestDb, disconnectFromTestDb, dropTestDb} from "../src/common/database/mongoose-test-helper";

describe('/users', () => {
    let app: INestApplication;
    let configService: ConfigService;
    const path = '/users';
    const user = {
        email: 'admin@gmail.com',
        password: 'password',
        firstName: 'first name',
        lastName: 'last name',
    };

    beforeEach(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [
                AppModule,
            ],
        }).compile();

        app = moduleFixture.createNestApplication();

        configService = moduleFixture.get<ConfigService>(ConfigService);

        await app.init();
    });

    beforeEach(async () => {
        await connectToTestDb(configService);
        await dropTestDb();
    });

    afterAll(async () => {
        await disconnectFromTestDb();
    });

    describe('POST /signup', () => {
        test('given user properties, creates it', async () => {
            const res = await request(app.getHttpServer())
                .post(`${path}/signup`)
                .send(user);

            expect(res.statusCode).toEqual(201);
            expect(res.body.id).toBeDefined();
            expect(res.body.email).toEqual(user.email);
        });

        test('duplicate email, throws BadRequestException', async () => {
            await request(app.getHttpServer())
                .post(`${path}/signup`)
                .send(user)
                .expect(201);

            const res = await request(app.getHttpServer())
                .post(`${path}/signup`)
                .send(user);

            expect(res.statusCode).toEqual(400);
            expect(res.body.message).toMatch(/already in use/);
        });
    });

    describe('POST /login', () => {
        test('existing user, giving correct credentials, logs in', async () => {
            await request(app.getHttpServer())
                .post(`${path}/signup`)
                .send(user)
                .expect(201);

            const res = await request(app.getHttpServer())
                .post(`${path}/login`)
                .send({
                    email: user.email,
                    password: user.password,
                });

            expect(res.statusCode).toEqual(200);
            expect(res.body.token).toBeDefined();
        });

        test('existing user, giving wrong credentials, throws UnauthorizedException', async () => {
            await request(app.getHttpServer())
                .post(`${path}/signup`)
                .send(user)
                .expect(201);

            const res = await request(app.getHttpServer())
                .post(`${path}/login`)
                .send({
                    email: user.email,
                    password: 'invalid',
                });

            expect(res.statusCode).toEqual(401);
            expect(res.body.error).toMatch(/Unauthorized/);
        });

        test('non-existing user, throws UnauthorizedException', async () => {
            const res = await request(app.getHttpServer())
                .post(`${path}/login`)
                .send({
                    email: user.email,
                    password: user.password,
                });

            expect(res.statusCode).toEqual(401);
            expect(res.body.error).toMatch(/Unauthorized/);
        });
    });

    describe('GET /profile', () => {
        test('giving logged in user token, returns its info', async () => {
            await request(app.getHttpServer())
                .post(`${path}/signup`)
                .send(user)
                .expect(201);

            const loginRes = await request(app.getHttpServer())
                .post(`${path}/login`)
                .send({
                    email: user.email,
                    password: user.password,
                })
                .expect(200);
            const token = loginRes.body.token;

            const res = await request(app.getHttpServer())
                .get(`${path}/profile`)
                .set('Authorization', `Bearer ${token}`);

            expect(res.statusCode).toEqual(200);
            expect(res.body.id).toBeDefined();
            expect(res.body.email).toEqual(user.email);
        });

        test('not giving a valid token, throws UnauthorizedException', async () => {
            const res = await request(app.getHttpServer())
                .get(`${path}/profile`);

            expect(res.statusCode).toEqual(401);
            expect(res.body.message).toMatch(/Unauthorized/);
        });
    });
});
