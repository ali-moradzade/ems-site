import {BadRequestException, Injectable, NotFoundException, UnauthorizedException} from '@nestjs/common';
import {JwtService} from '@nestjs/jwt';
import {UsersService} from "./users.service";
import * as bcrypt from 'bcrypt';
import {AuthTokenDto} from "../dtos/AuthToken.dto";

@Injectable()
export class AuthService {
    private readonly saltOrRounds = 10;

    constructor(
        private usersService: UsersService,
        private jwtService: JwtService,
    ) {
    }

    createJwtToken(user: AuthTokenDto) {
        return this.jwtService.sign(user);
    }

    async signup(email: string, password: string, firstName: string, lastName: string) {
        const users = await this.usersService.find(email);

        if (users.length) {
            throw new BadRequestException('Email in use');
        }

        const hash = await bcrypt.hash(password, this.saltOrRounds);

        return await this.usersService.create(email, hash, firstName, lastName);
    }

    async login(email: string, password: string) {
        const [user] = await this.usersService.find(email);

        if (!user) {
            throw new NotFoundException('User not found');
        }

        if (!(await bcrypt.compare(password, user.password))) {
            throw new UnauthorizedException('Invalid credentials');
        }

        const tokenProperties: AuthTokenDto = {
            id: user.id,
            email,
        };

        return this.createJwtToken(tokenProperties);
    }
}
