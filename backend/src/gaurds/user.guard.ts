import {ExecutionContext} from '@nestjs/common';
import {AuthGuard} from "@nestjs/passport";

export class UserGuard extends AuthGuard('jwt') {
    async canActivate(context: ExecutionContext) {
        const activate = await super.canActivate(context);
        if (!activate) {
            return false;
        }

        const req = context.switchToHttp().getRequest();

        return req.session.userId;
    }
}
