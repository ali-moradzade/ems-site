import {IsNotEmpty, IsNumber, IsString, validateSync} from "class-validator";
import {plainToInstance} from "class-transformer";

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
    MONGO_URI: string;

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