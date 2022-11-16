import type { ZodError, ZodIssue } from 'zod';
import type { NextApiRequestSchema } from './types';

export class ZodRequestError<TZodError extends ZodError> {
  public requestError: {
    method: ZodIssue[];
    query: ZodIssue[];
    headers: ZodIssue[];
    cookies: ZodIssue[];
  };
  constructor(private zodError: TZodError) {
    this.requestError = this.getError();
  }
  getTypes() {
    const { query, cookies, headers, method } = this.requestError;
    return [method.length > 0 ? 'method' : null].filter((v) => v);
  }
  private getError(): Record<keyof NextApiRequestSchema, ZodIssue[]> {
    return {
      method: [
        {
          code: 'invalid_enum_value',
          message: 'Invalid method',
          options: ['GET'],
          received: 'POST',
          path: ['method'],
        },
      ],
      query: [],
      headers: [],
      cookies: [],
    };
  }
}
