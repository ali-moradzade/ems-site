import {NestFactory} from '@nestjs/core';
import {AppModule} from './app.module';
import {SwaggerModule} from '@nestjs/swagger';
import * as fs from 'fs';
import * as yaml from 'yaml';
import {join} from "path";

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    app.enableCors();

    // Load the custom OpenAPI spec file, and serve it using Swagger
    const file = fs.readFileSync(join(__dirname, '..', '..', 'docs', 'open-api.yaml'), 'utf8');
    const openAPISpec = yaml.parse(file);
    SwaggerModule.setup('docs', app, openAPISpec);

    await app.listen(3300);
}

bootstrap().then();
