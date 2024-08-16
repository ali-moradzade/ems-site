import {createParamDecorator, ExecutionContext} from "@nestjs/common";
import {UserTokenDto} from "../../dtos/userToken.dto";

export const CurrentUser = createParamDecorator(
    (data: never, context: ExecutionContext) => {
        const req = context.switchToHttp().getRequest();
        return req.user as UserTokenDto;
    }
);
