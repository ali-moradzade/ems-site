import mongoose from 'mongoose';
import {ConfigService} from '@nestjs/config';
import {getMongoUri} from "../../env-validation";

export const connectToTestDb = async (configService: ConfigService) => {
    const uri = getMongoUri(configService);
    if (!uri) {
        throw new Error('mongo uri is not defined');
    }
    await mongoose.connect(uri, {dbName: 'ems_website_test'});
};

export const disconnectFromTestDb = async () => {
    await mongoose.disconnect();
};

export const dropTestDb = async () => {
    const db = mongoose.connection.db;
    if (db) {
        await db.dropDatabase();
    } else {
        throw new Error('Database connection is not established');
    }
};
