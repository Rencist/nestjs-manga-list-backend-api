import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import {decode, verify } from 'jsonwebtoken';
@Injectable()
export class JwtGuard implements CanActivate {

  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    const token = request.headers?.authorization ?? null;
    if (!token) return false;
    if (token.split(' ').length < 2) return false;

    const bearerToken = token.split(' ')[1];

    return this.validateToken(bearerToken);
  }

  validateToken(token: string) {
    try {
      const isValid = verify(token, process.env.SECRET_JWT);
      if (!isValid) return false;
      const decodeToken = decode(token, { json: true });

      if (!decodeToken.uid) return false;
      return true;
    } catch {
      return false;
    }
  }
}