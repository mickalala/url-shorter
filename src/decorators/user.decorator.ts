import { Response } from "express";
import { ExecutionContext, NotFoundException, createParamDecorator } from "@nestjs/common";

export const User = createParamDecorator((data: string, context: ExecutionContext) => {
  const response = context.switchToHttp().getResponse<Response>();
  const { user } = response.locals;

  if (!user) {
    throw new NotFoundException("User not found.");
  }

  return user;
})