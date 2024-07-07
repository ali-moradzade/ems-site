import {CallHandler, ExecutionContext, Injectable, NestInterceptor} from "@nestjs/common";
import {UsersService} from "../users.service";
import {Observable} from "rxjs";

@Injectable()
export class CurrentUserInterceptor implements NestInterceptor {
    constructor(
        private usersService: UsersService,
    ) {
    }

    async intercept(context: ExecutionContext, next: CallHandler<any>): Promise<Observable<any>> {
        const req = context.switchToHttp().getRequest();
        const {userId} = req.session;

        if (userId) {
            req.currentUser = await this.usersService.findOne(userId);
        }

        return next.handle();
    }
}
