import {
  HttpBadRequest,
  HttpMethodNotAllowed,
} from '@belgattitude/http-exception';
import type { z } from 'zod';
import type { IErrorHandler } from './IErrorHandler';

export class HttpExceptionHandler implements IErrorHandler {
  process = (error: z.ZodError) => {
    const methodError =
      error.issues.filter((issue) => issue.path?.[0] === 'method')?.[0] ?? null;
    if (methodError) {
      throw new HttpMethodNotAllowed();
    }
    const queryError = error.issues.filter(
      (issue) => issue.path?.[0] === 'query'
    );
    if (queryError.length > 0) {
      throw new HttpBadRequest({
        message: queryError?.[0].message,
        cause: error,
      });
    }
  };
}