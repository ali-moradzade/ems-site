import {ExecutionContext} from '@nestjs/common';
import {AuthGuard} from "@nestjs/passport";
import {AuthTokenDto} from "../dtos/AuthToken.dto";

export class UserGuard extends AuthGuard('jwt') {
    async canActivate(context: ExecutionContext) {
        const activate = await super.canActivate(context);
        if (!activate) {
            return false;
        }

        const request = context.switchToHttp().getRequest();
        const user = request.user as AuthTokenDto;

        return !!user;
    }
}
