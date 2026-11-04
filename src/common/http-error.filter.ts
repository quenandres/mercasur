import { ArgumentsHost, Catch, ExceptionFilter, HttpException } from '@nestjs/common';
import type { Request, Response } from 'express';

@Catch(HttpException)
export class HttpErrorFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const status = exception.getStatus();

    // getResponse() trae el detalle: para un 400 del ValidationPipe es
    // { message: ['price must be a positive number'], ... }
    const body = exception.getResponse();
    const message = typeof body === 'object' && 'message' in body ? body.message : exception.message;

    ctx.getResponse<Response>().status(status).json({
      statusCode: status,
      error: message,
      path: ctx.getRequest<Request>().url,
      timestamp: new Date().toISOString(),
    });
  }
}
