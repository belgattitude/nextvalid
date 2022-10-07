import type { HttpException } from '@belgattitude/http-exception';
import { HttpBadRequest } from '@belgattitude/http-exception';
import type { NextApiRequest } from 'next';
import type { z } from 'zod';
import { createSchema } from './createSchema';
import type { NextApiRequestSchema, ParsableApiRequest } from './types';

type Params<T> = {
  onError?: (error: z.ZodError<T>) => Error | HttpException;
};

export class SafeRequest<
  TReq extends Partial<ParsableApiRequest> = NextApiRequest
> {
  constructor(public readonly req: TReq) {}

  parse = <T extends NextApiRequestSchema>(
    schema: T,
    params?: Params<T>
  ): z.infer<ReturnType<typeof createSchema<T>>> => {
    const { onError } = params ?? {};
    const validation = createSchema(schema);
    const parsed = validation.safeParse(this.req);
    if (!parsed.success) {
      const { error } = parsed;
      if (onError) {
        // @todo
        throw onError(error as unknown as any);
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
