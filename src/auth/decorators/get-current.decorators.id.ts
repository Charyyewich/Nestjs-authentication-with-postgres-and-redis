import { createParamDecorator, ExecutionContext } from "@nestjs/common";


export const GetCurrentUserId = createParamDecorator(
    (data: undefined, context: ExecutionContext) => {
        const request = context.switchToHttp().getResponse();
        return request.user['sub'];
    },
);