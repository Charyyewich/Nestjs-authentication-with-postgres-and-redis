// import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
// import { Reflector } from "@nestjs/core";

// @Injectable()
// export class AuthGuard implements CanActivate {
//  constructor(private reflector: Reflector) {}
//  canActivate(context: ExecutionContext): boolean {
//  const request = context.switchToHttp().getRequest();

//  const noAuth = this.reflector.get<boolean>('no-auth', context.getHandler())
//  if(noAuth) return true

//  return request.headers?.authorization === 'valid_token';
//  }
// }