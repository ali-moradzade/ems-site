import {createParamDecorator, ExecutionContext} from '@nestjs/common';
import {UserTokenDto} from "../dtos/userToken.dto";

export const User = createParamDecorator(
    (data: unknown, ctx: ExecutionContext) => {
        const request = ctx.switchToHttp().getRequest();
        const user = request.user;

        return {
            id: user.id,
            email: user.email,
        } as UserTokenDto;
    },
);
