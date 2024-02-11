import { SetMetadata, applyDecorators } from "@nestjs/common";

export const SkipAuth = () => applyDecorators(
    SetMetadata('no-auth', true)
  );