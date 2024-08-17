import {Body, Controller, Delete, Get, HttpCode, Param, Post, Put, Query, UseGuards} from '@nestjs/common';
import {UsersService} from "./users.service";
import {CreateUserDto} from "./dtos/create-user.dto";
import {UpdateUserDto} from "./dtos/update-user.dto";
import {LoginUserDto} from './dtos/login-user.dto';
import {UserDto} from "./dtos/user.dto";
import {AuthService} from "./auth.service";
import {UserGuard} from "../../gaurds/user.guard";
import {CurrentUser} from "./decorators/current-user.decorator";
import {UserTokenDto} from "../../dtos/userToken.dto";
import {Serialize} from "../../decorators/serialize.decorator";

@Controller('auth')
export class UsersController {
    constructor(
        private usersService: UsersService,
        private authService: AuthService,
    ) {
    }

    @UseGuards(UserGuard)
    @Get('whoami')
    whoAmI(
        @CurrentUser() user: UserTokenDto,
    ) {
        return user;
    }

    @Get(':id')
    @Serialize(UserDto)
    async findUser(
        @Param('id') id: string,
    ) {
        return this.usersService.findOne(parseInt(id));
    }

    @Get()
    @Serialize(UserDto)
    findAllUsers(
        @Query('email') email: string
    ) {
        return this.usersService.find(email);
    }

    @Post('signup')
    @Serialize(UserDto)
    async signup(
        @Body() {email, password, firstName, lastName}: CreateUserDto,
    ) {
        return this.authService.signup(email, password, firstName, lastName);
    }

    @Post('login')
    @HttpCode(200)
    async login(
        @Body() {email, password}: LoginUserDto,
    ) {
        return this.authService.login(email, password);
    }

    @Delete(':id')
    @Serialize(UserDto)
    deleteUser(
        @Param('id') id: string,
    ) {
        return this.usersService.remove(parseInt(id));
    }

    @Put(':id')
    @Serialize(UserDto)
    updateUser(
        @Param('id') id: string,
        @Body() body: UpdateUserDto,
    ) {
        return this.usersService.update(parseInt(id), body);
    }
}
