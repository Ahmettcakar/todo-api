import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';

@Injectable()
export class SimpleAuthGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    // Header'da x-api-key anahtarı "12345" ise erişime izin ver
    return request.headers['x-api-key'] === '12345';
  }
}
