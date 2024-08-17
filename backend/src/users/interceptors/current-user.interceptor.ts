import {CallHandler, ExecutionContext, Injectable, NestInterceptor} from "@nestjs/common";
import {UsersService} from "../users.service";
import {Observable} from "rxjs";
import {UserTokenDto} from "../../dtos/userToken.dto";

@Injectable()
export class CurrentUserInterceptor implements NestInterceptor {
    constructor(
        private usersService: UsersService,
    ) {
    }

    async intercept(context: ExecutionContext, next: CallHandler<any>): Promise<Observable<any>> {
        const req = context.switchToHttp().getRequest();
        const {id} = req.user as UserTokenDto;

        if (id) {
            req.currentUser = await this.usersService.findOne(id);
        }

        return next.handle();
    }
}
