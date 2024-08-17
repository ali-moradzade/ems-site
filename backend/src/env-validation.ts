import {IsString, validateSync} from "class-validator";
import {plainToInstance} from "class-transformer";

/**
 * Define env schema here
 */
class EnvironmentVariables {
    /**
     * Database
     */
    @IsString()
    DB_NAME: string;

    /**
     * Authentication
     */
    @IsString()
    JWT_SECRET_KEY: string;
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