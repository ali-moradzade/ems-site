import {IsString, validateSync} from "class-validator";
import {plainToInstance} from "class-transformer";

/**
 * Define env schema here
 */
class EnvironmentVariables {
    @IsString()
    DB_NAME: string;
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