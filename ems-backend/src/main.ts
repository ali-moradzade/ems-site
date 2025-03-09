import {NestFactory} from '@nestjs/core';
import {AppModule} from './app.module';
import {SwaggerModule} from '@nestjs/swagger';
import * as fs from 'fs';
import * as yaml from 'yaml';
import {join} from "path";
import {ConfigService} from "@nestjs/config";

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    const configService = app.get(ConfigService);

    app.enableCors();
    app.setGlobalPrefix('api');

    // Load the custom OpenAPI spec file, and serve it using Swagger
    const file = fs.readFileSync(join(__dirname, '..', '..', 'docs', 'open-api.yaml'), 'utf8');
    const openAPISpec = yaml.parse(file);
    SwaggerModule.setup('docs', app, openAPISpec);

    const PORT = configService.get<number>('PORT');
    await app.listen(PORT);

    console.log(`Application is running on: http://localhost:${PORT}`);
}

bootstrap().then();
