import {IsNotEmpty, IsNumber, IsOptional, IsString, validateSync} from "class-validator";
import {plainToInstance} from "class-transformer";
import {ConfigService} from "@nestjs/config";

/**
 * Define env schema here
 */
class EnvironmentVariables {
    /**
     * Deployment
     */
    @IsNumber()
    @IsNotEmpty()
    PORT: number;

    /**
     * Database
     */
    @IsString()
    @IsNotEmpty()
    MONGO_DB: string;

    @IsString()
    @IsNotEmpty()
    MONGO_HOST: string;

    @IsNumber()
    @IsNotEmpty()
    MONGO_PORT: number;

    @IsString()
    @IsNotEmpty()
    MONGO_AUTH_ENABLED: string;

    @IsString()
    @IsOptional()
    MONGO_USER?: string;

    @IsString()
    @IsOptional()
    MONGO_PASSWORD?: string;

    @IsString()
    @IsOptional()
    MONGO_AUTH_SOURCE?: string;

    /**
     * Authentication
     */
    @IsString()
    @IsNotEmpty()
    JWT_SECRET_KEY: string;

    @IsString()
    @IsNotEmpty()
    SUPER_ADMIN_SECRET_KEY: string;
}

export const getMongoUri = (configService: ConfigService): string => {
    const host = configService.get<string>('MONGO_HOST');
    const port = configService.get<number>('MONGO_PORT');
    const db = configService.get<string>('MONGO_DB');
    const authEnabled = configService.get<string>('MONGO_AUTH_ENABLED');
    const user = configService.get<string>('MONGO_USER');
    const password = configService.get<string>('MONGO_PASSWORD');
    const authSource = configService.get<string>('MONGO_AUTH_SOURCE');

    let mongoUri = `mongodb://${host}:${port}/${db}`;

    if (authEnabled === 'true' && user && password) {
        mongoUri = `mongodb://${user}:${encodeURIComponent(password)}@${host}:${port}/${db}?authSource=${authSource}`;
    }

    return mongoUri;
};

export function validate(config: Record<string, unknown>) {
    const validatedConfig = plainToInstance(EnvironmentVariables, config, {
            enableImplicitConversion: true,
        }
    );

    const errors = validateSync(validatedConfig, {
        skipMissingProperties: false,
    });

    if (errors.length > 0) {
        throw new Error(errors.toString());
    }

    return validatedConfig;
}