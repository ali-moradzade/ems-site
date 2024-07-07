import {Body, Controller, Delete, Get, NotFoundException, Param, Patch, Post, Query} from '@nestjs/common';
import {UsersService} from "./users.service";
import {CreateUserDto} from "./dtos/create-user.dto";
import {UpdateUserDto} from "./dtos/update-user.dto";
import {LoginUserDto} from './dtos/login-user.dto';
import {Serialize} from "../interceptors/serialize.interceptor";
import {UserDto} from "./dtos/user.dto";
import {AuthService} from "./auth.service";

@Serialize(UserDto)
@Controller('auth')
export class UsersController {
    constructor(
        private usersService: UsersService,
        private authService: AuthService,
    ) {
    }

    @Get(':id')
    async findUser(
        @Param('id') id: string,
    ) {
        const user = await this.usersService.findOne(parseInt(id));

        if (!user) {
            throw new NotFoundException('User not found');
        }

        return user;
    }

    @Get()
    findAllUsers(
        @Query('email') email: string
    ) {
        return this.usersService.find(email);
    }

    @Post('signup')
    signup(
        @Body() body: CreateUserDto,
    ) {
        const {email, password, firstName, lastName} = body;

        return this.authService.signup(email, password, firstName, lastName);
    }

    @Post('login')
    async login(
        @Body() body: LoginUserDto,
    ) {
        const {email, password} = body;
        return this.authService.login(email, password);
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
