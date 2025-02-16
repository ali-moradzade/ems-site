import {Body, Controller, HttpCode, Post} from '@nestjs/common';
import {AdminsService} from './admins.service';
import {LoginDto} from './dtos/login.dto';
import {SignupDto} from './dtos/signup.dto';
import {Serialize} from 'src/decorators/serialize.decorator';
import {AdminDto} from './dtos/admin.dto';

@Controller('admins')
export class AdminsController {
    constructor(
        private readonly adminService: AdminsService,
    ) {
    }

    @Post('signup')
    @Serialize(AdminDto)
    signup(
        @Body() {secretKey, email, password, name, superAdmin}: SignupDto,
    ) {
        return this.adminService.signup(secretKey, email, password, name, superAdmin);
    }

    @Post('login')
    @HttpCode(200)
    login(@Body() {email, password}: LoginDto) {
        return this.adminService.login(email, password);
    }
}
