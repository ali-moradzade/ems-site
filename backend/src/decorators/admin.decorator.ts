import {createParamDecorator, ExecutionContext} from '@nestjs/common';
import {AdminTokenDto} from '../dtos/adminToken.dto';

export const Admin = createParamDecorator(
    (data: unknown, ctx: ExecutionContext) => {
        const request = ctx.switchToHttp().getRequest();
        const user = request.user;
        
        return {
            id: user.id,
            email: user.email,
            superAdmin: user.superAdmin,
        } as AdminTokenDto;
    },
);
