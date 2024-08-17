import {createParamDecorator, ExecutionContext} from "@nestjs/common";
import {User} from "../user.entity";

export const CurrentUser = createParamDecorator(
    (data: never, context: ExecutionContext) => {
        const req = context.switchToHttp().getRequest();

        return req.currentUser as User;
    }
);
