import {ExecutionContext, Injectable} from '@nestjs/common';
import {AuthGuard} from "@nestjs/passport";
import {UserTokenDto} from "../dtos/userToken.dto";

@Injectable()
export class UserGuard extends AuthGuard('jwt') {
    async canActivate(context: ExecutionContext) {
        const activate = await super.canActivate(context);
        if (!activate) {
            return false;
        }

        const request = context.switchToHttp().getRequest();
        const user = request.user as UserTokenDto;

        return !!user;
    }
}
