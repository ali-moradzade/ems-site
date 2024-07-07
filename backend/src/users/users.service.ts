import {BadRequestException, Injectable, NotFoundException} from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {User} from "./user.entity";
import {Repository} from "typeorm";

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User) private repository: Repository<User>,
    ) {
    }

    findOne(id: number) {
        if (!id) {
            return null;
        }

        return this.repository.findOneBy({
            id,
        });
    }

    find(email: string) {
        return this.repository.findBy({
            email,
        });
    }

    async create(
        email: string, password: string, firstName: string, lastName: string,
    ) {
        const users = await this.find(email);

        if (users.length) {
            throw new BadRequestException('Email in use');
        }

        const user = this.repository.create({
            email, password, firstName, lastName,
        });

        return this.repository.save(user);
    }

    async update(id: number, attrs: Partial<User>) {
        const user = await this.findOne(id);

        if (!user) {
            throw new NotFoundException('User not found');
        }

        Object.assign(user, attrs);

        return this.repository.save(user);
    }

    async remove(id: number) {
        const user = await this.findOne(id);

        if (!user) {
            throw new NotFoundException('User not found');
        }

        return this.repository.remove(user);
    }
}
