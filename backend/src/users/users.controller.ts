import {Body, Controller, Delete, Get, NotFoundException, Param, Patch, Post, Query} from '@nestjs/common';
import {UsersService} from "./users.service";
import {CreateUserDto} from "./dtos/create-user.dto";
import {UpdateUserDto} from "./dtos/update-user.dto";

@Controller('users')
export class UsersController {
    constructor(
        private usersService: UsersService,
    ) {
    }

    @Get(':id')
    async findUser(
        @Param('id') id: string,
    ) {
        const user = await this.usersService.findOne(parseInt(id));

        if (!user) {
            return new NotFoundException('User not found');
        }

        return user;
    }

    @Get()
    findAllUsers(
        @Query('email') email: string
    ) {
        return this.usersService.find(email);
    }

    @Post()
    createUser(
        @Body() body: CreateUserDto,
    ) {
        const {email, password, firstName, lastName} = body;

        return this.usersService.create(email, password, firstName, lastName);
    }

    @Delete(':id')
    deleteUser(
        @Param('id') id: string,
    ) {
        return this.usersService.remove(parseInt(id));
    }

    @Patch(':id')
    updateUser(
        @Param('id') id: string,
        @Body() body: UpdateUserDto,
    ) {
        return this.usersService.update(parseInt(id), body);
    }
}
