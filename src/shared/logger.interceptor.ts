import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  Logger,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class LoggerInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const now = Date.now();
    const request = context.switchToHttp().getRequest();
    const method = request.method;
    const url = request.url;

    Logger.log(`${method} ${url}`, 'HTTP');

    return next.handle().pipe(
      tap(() =>
        Logger.log(`${method} ${url} - ${Date.now() - now}ms`, 'HTTP'),
      ),
    );
  }
}