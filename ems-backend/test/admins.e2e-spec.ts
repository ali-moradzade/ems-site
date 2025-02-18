import {afterAll, beforeEach, describe, expect, test} from "vitest";
import {INestApplication} from "@nestjs/common";
import {Test, TestingModule} from "@nestjs/testing";
import {AppModule} from "../src/app.module";
import request from "supertest";
import {ConfigService} from "@nestjs/config";
import {connectToTestDb, disconnectFromTestDb, dropTestDb} from "../src/common/database/mongoose-test-helper";

describe('/admins', () => {
    let app: INestApplication;
    let configService: ConfigService;
    const path = '/admins';
    const admin = {
        secretKey: '',
        email: 'admin@gmail.com',
        password: 'password',
        name: 'admin',
        superAdmin: false,
        token: '',
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
    });

    afterAll(async () => {
        await disconnectFromTestDb();
    });

    describe('POST /signup', () => {
        test('given admin properties, creates it', async () => {
            const res = await request(app.getHttpServer())
                .post(`${path}/signup`)
                .send(admin);

            expect(res.statusCode).toEqual(201);
            expect(res.body.id).toBeDefined();
            expect(res.body.email).toEqual(admin.email);
        });

        test('duplicate email, throws BadRequestException', async () => {
            await request(app.getHttpServer())
                .post(`${path}/signup`)
                .send(admin);

            const res = await request(app.getHttpServer())
                .post(`${path}/signup`)
                .send(admin);

            expect(res.statusCode).toEqual(400);
            expect(res.body.message).toMatch(/already in use/);
        });

        test('not giving correct secretKey, throws ForbiddenException', async () => {
            const res = await request(app.getHttpServer())
                .post(`${path}/signup`)
                .send({
                    ...admin,
                    secretKey: 'invalid',
                });

            expect(res.statusCode).toEqual(403);
            expect(res.body.error).toMatch(/Forbidden/);
        });
    });

    describe('POST /login', () => {
        test('existing admin, giving correct credentials, logs in', async () => {
            await request(app.getHttpServer())
                .post(`${path}/signup`)
                .send(admin);

            const res = await request(app.getHttpServer())
                .post(`${path}/login`)
                .send({
                    email: admin.email,
                    password: admin.password,
                });

            expect(res.statusCode).toEqual(200);
            expect(res.body.token).toBeDefined();
            expect(res.body.superAdmin).toEqual(admin.superAdmin);
        });

        test('existing admin, giving in-correct credentials, throws UnauthorizedException', async () => {
            await request(app.getHttpServer())
                .post(`${path}/signup`)
                .send(admin);

            const res = await request(app.getHttpServer())
                .post(`${path}/login`)
                .send({
                    email: admin.email,
                    password: 'invalid',
                });

            expect(res.statusCode).toEqual(401);
            expect(res.body.error).toMatch(/Unauthorized/);
        });

        test('non-existing admin, throws UnauthorizedException', async () => {
            const res = await request(app.getHttpServer())
                .post(`${path}/login`)
                .send({
                    email: admin.email,
                    password: admin.password,
                });

            expect(res.statusCode).toEqual(401);
            expect(res.body.error).toMatch(/Unauthorized/);
        });
    });
});
