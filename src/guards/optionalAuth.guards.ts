import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { AuthService } from "./../auth/auth.service";
import { UsersService } from "../auth/users.service";
import { Request, Response } from "express";

@Injectable()
export class OptionalJwtAuthGuard implements CanActivate {

  constructor(
    private authService: AuthService,
    private userService: UsersService
  ) { }

  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest<Request>();
    const response = context.switchToHttp().getResponse<Response>();

    const { authorization } = request.headers;
    if (!authorization) {
      return true;
    }
    else {
      try {
        const data = this.authService.checkToken((authorization ?? "").split(" ")[1]);
        const user = await this.userService.getById(parseInt(data.sub));

        response.locals.user = user; // insert user into response to use it later on

        return true;
      } catch (error) {
        throw new UnauthorizedException();
      }
    }
  }
}