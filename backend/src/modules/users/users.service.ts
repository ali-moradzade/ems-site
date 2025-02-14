import {BadRequestException, Injectable, NotFoundException, UnauthorizedException} from '@nestjs/common';
import {Model} from "mongoose";
import {InjectModel} from "@nestjs/mongoose";
import {User, UserDocument} from "../../common/database/schemas/user.schema";
import * as bcrypt from "bcrypt";
import {UserTokenDto} from "../../dtos/userToken.dto";
import {AuthService} from "../auth/auth.service";

@Injectable()
export class UsersService {
    private readonly saltOrRounds = 10;

    constructor(
        @InjectModel(User.name) private repository: Model<UserDocument>,
        private authService: AuthService,
    ) {
    }

    findOne(id: string) {
        if (!id) {
            return null;
        }

        return this.repository.findById(id);
    }

    findByEmail(email: string) {
        return this.repository.findOne({
            email,
        });
    }

    async signup(email: string, password: string, firstName: string, lastName: string) {
        const result = await this.findByEmail(email);

        if (result) {
            throw new BadRequestException('Email already in use');
        }

        const hash = await bcrypt.hash(password, this.saltOrRounds);

        return this.repository.create({
            email, password: hash, firstName, lastName
        });
    }

    async login(email: string, password: string) {
        const user = await this.findByEmail(email);

        if (!user) {
            throw new NotFoundException('User not found');
        }

        if (!(await bcrypt.compare(password, user.password))) {
            throw new UnauthorizedException('Invalid credentials');
        }

        const tokenProperties: UserTokenDto = {
            id: user.id,
            email,
        };
        const token = this.authService.createJwtToken(tokenProperties);

        return {
            token,
        };
    }
}
