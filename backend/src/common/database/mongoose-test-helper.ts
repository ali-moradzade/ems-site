import mongoose from 'mongoose';
import {ConfigService} from '@nestjs/config';

export const connectToTestDb = async (configService: ConfigService) => {
    const uri = configService.get<string>('MONGO_URI');
    if (!uri) {
        throw new Error('MONGO_URI is not defined');
    }
    await mongoose.connect(uri, {dbName: 'vpn_management_test'});
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
