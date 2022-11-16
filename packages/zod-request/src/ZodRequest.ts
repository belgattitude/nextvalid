import {
  HttpBadRequest,
  HttpMethodNotAllowed,
} from '@belgattitude/http-exception';
import type { NextApiRequest } from 'next';
import type { z, ZodIssue, ZodError } from 'zod';

import { createSchema } from './createSchema';
import type {
  HttpMethod,
  NextApiRequestSchema,
  ParsableApiRequest,
} from './types';
import { ZodRequestError } from './ZodRequestError';

type Params<T extends ZodError> = {
  onError?: (err: ZodRequestError<T>) => Error;
};

export class ZodRequest<
  TSchema extends NextApiRequestSchema,
  TReq extends Partial<ParsableApiRequest> = NextApiRequest & {
    method: HttpMethod;
  }
> {
  constructor(private readonly req: TReq, private readonly schema: TSchema) {}

  parse = (
    params?: Params<ZodError<TSchema>>
  ): z.infer<ReturnType<typeof createSchema<TSchema>>> => {
    const { onError } = params ?? {};
    const validation = createSchema(this.schema);
    const parsed = validation.safeParse(this.req);
    if (!parsed.success) {
      const err = new ZodRequestError(parsed.error);
      if (onError) {
        // @todo
        throw onError(err as never);
      }
      const errorType = err.getTypes();
      if (errorType.includes('method')) {
        throw new HttpMethodNotAllowed({
          message: err.requestError.method?.[0].message,
        });
      }
      const msg = parsed.error.errors
        .map((err) => `${err.path} ${err.code} - ${err.message}`)
        .join(', ');
      throw new HttpBadRequest({
        message: `Bad request, invalid parameter (${msg})`,
        url: this.req.url,
      });
    }
    return parsed.data;
  };
}
