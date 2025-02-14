import {BadRequestException, ForbiddenException, Injectable, UnauthorizedException,} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import {AuthService} from '../auth/auth.service';
import {ConfigService} from '@nestjs/config';
import {AdminTokenDto} from '../../dtos/adminToken.dto';
import {InjectModel} from '@nestjs/mongoose';
import {Admin, AdminDocument} from '../../common/database/schemas/admin.schema';
import {Model} from 'mongoose';

@Injectable()
export class AdminsService {
    private saltOrRounds = 10;

    constructor(
        @InjectModel(Admin.name) private repository: Model<AdminDocument>,
        private configService: ConfigService,
        private authService: AuthService,
    ) {
    }

    async findAll() {
        return this.repository.find();
    }

    async findOne(id: string) {
        if (!id) {
            return null;
        }

        return this.repository.findById(id);
    }

    async findByEmail(email: string) {
        return this.repository.findOne({
            email,
        });
    }

    async signup(secretKey: string, email: string, password: string, name: string, superAdmin: boolean) {
        const correctKey = this.configService.get<string>('SUPER_ADMIN_SECRET_KEY');
        if (secretKey !== correctKey) {
            throw new ForbiddenException('Invalid credentials');
        }

        const result = await this.findByEmail(email);

        if (result) {
            throw new BadRequestException('Email already in use');
        }

        const hash = await bcrypt.hash(password, this.saltOrRounds);
        const properties = {
            email,
            password: hash,
            name, superAdmin
        };

        return this.repository.create(properties);
    }

    async login(email: string, password: string) {
        const admin = await this.findByEmail(email);

        if (!admin) {
            throw new UnauthorizedException('Invalid credentials');
        }

        if (!(await bcrypt.compare(password, admin.password))) {
            throw new UnauthorizedException('Invalid credentials');
        }

        const {id, superAdmin} = admin;

        const tokenProperties: AdminTokenDto = {id, email, superAdmin};
        const token = this.authService.createJwtToken(tokenProperties);

        return {
            token,
            superAdmin,
        };
    }
}
