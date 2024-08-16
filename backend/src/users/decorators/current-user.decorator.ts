import {createParamDecorator, ExecutionContext} from "@nestjs/common";
import {AuthTokenDto} from "../../dtos/AuthToken.dto";

export const CurrentUser = createParamDecorator(
    (data: never, context: ExecutionContext) => {
        const req = context.switchToHttp().getRequest();
        return req.user as AuthTokenDto;
    }
);
