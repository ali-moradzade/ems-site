import {
    Body,
    Controller,
    Delete,
    Get,
    NotFoundException,
    Param,
    Patch,
    Post,
    Query,
    Session,
    UseGuards
} from '@nestjs/common';
import {UsersService} from "./users.service";
import {CreateUserDto} from "./dtos/create-user.dto";
import {UpdateUserDto} from "./dtos/update-user.dto";
import {LoginUserDto} from './dtos/login-user.dto';
import {Serialize} from "../interceptors/serialize.interceptor";
import {UserDto} from "./dtos/user.dto";
import {AuthService} from "./auth.service";
import {AuthGuard} from "../gaurds/auth.guard";
import {CurrentUser} from "./decorators/current-user.decorator";
import {User} from "./user.entity";

@Serialize(UserDto)
@Controller('auth')
export class UsersController {
    constructor(
        private usersService: UsersService,
        private authService: AuthService,
    ) {
    }

    @UseGuards(AuthGuard)
    @Get('whoami')
    whoAmI(
        @CurrentUser() user: User,
    ) {
        return user;
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
    async signup(
        @Body() body: CreateUserDto,
        @Session() session: any,
    ) {
        const {email, password, firstName, lastName} = body;
        const user = await this.authService.signup(email, password, firstName, lastName);

        session.userId = user.id;

        return user;
    }

    @Post('login')
    async login(
        @Body() body: LoginUserDto,
        @Session() session: any,
    ) {
        const {email, password} = body;
        const user = await this.authService.login(email, password);

        session.userId = user.id;

        return user;
    }

    @Post('/logout')
    logout(
        @Session() session: any,
    ) {
        session.userId = null;
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
