import {BadRequestException, Injectable, NotFoundException} from '@nestjs/common';
import {UsersService} from "./users.service";
import {randomBytes, scrypt as _scrypt} from 'crypto';
import {promisify} from 'util';

const scrypt = promisify(_scrypt);

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
    ) {
    }

    async signup(email: string, password: string, firstName: string, lastName: string) {
        const users = await this.usersService.find(email);

        if (users.length) {
            throw new BadRequestException('Email in use');
        }

        const salt = randomBytes(8).toString('hex');
        const hash = (await scrypt(password, salt, 32)) as Buffer;

        const result = `${salt}.${hash.toString('hex')}`;

        return await this.usersService.create(email, result, firstName, lastName);
    }

    async login(email: string, password: string) {
        const [user] = await this.usersService.find(email);

        if (!user) {
            throw new NotFoundException('User not found');
        }

        const [salt, storedHash] = user.password.split('.');
        const hash = (await scrypt(password, salt, 32)) as Buffer;

        if (storedHash !== hash.toString('hex')) {
            throw new BadRequestException('Invalid credentials');
        }

        return user;
    }
}
