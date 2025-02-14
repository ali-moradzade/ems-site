import {Body, Controller, Get, HttpCode, Post, UseGuards} from '@nestjs/common';
import {UsersService} from "./users.service";
import {CreateUserDto} from "./dtos/create-user.dto";
import {LoginUserDto} from './dtos/login-user.dto';
import {UserDto} from "./dtos/user.dto";
import {UserGuard} from "../../gaurds/user.guard";
import {UserTokenDto} from "../../dtos/userToken.dto";
import {Serialize} from "../../decorators/serialize.decorator";
import {User} from "../../decorators/user.decorator";

@Controller('auth')
export class UsersController {
    constructor(
        private usersService: UsersService,
    ) {
    }

    @Get('profile')
    @UseGuards(UserGuard)
    @Serialize(UserDto)
    userProfile(
        @User() {id}: UserTokenDto,
    ) {
        return this.usersService.findOne(id);
    }

    @Post('signup')
    @Serialize(UserDto)
    async signup(
        @Body() {email, password, firstName, lastName}: CreateUserDto,
    ) {
        return this.usersService.signup(email, password, firstName, lastName);
    }

    @Post('login')
    @HttpCode(200)
    async login(
        @Body() {email, password}: LoginUserDto,
    ) {
        return this.usersService.login(email, password);
    }
}
