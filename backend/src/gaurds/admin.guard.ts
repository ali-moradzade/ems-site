import {ExecutionContext, Injectable} from '@nestjs/common';
import {AuthGuard} from '@nestjs/passport';
import {AdminTokenDto} from '../dtos/adminToken.dto';

@Injectable()
export class AdminGuard extends AuthGuard('jwt') {
    async canActivate(context: ExecutionContext) {
        const activate = await super.canActivate(context);
        if (!activate) {
            return false;
        }

        const request = context.switchToHttp().getRequest();
        const user = request.user as AdminTokenDto;

        return user !== undefined && user.superAdmin !== undefined;
    }
}
