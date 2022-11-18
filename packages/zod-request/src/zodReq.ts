import type { IErrorHandler } from './error';
import type { ParsableRequest, RequestSchema } from './types';
import { ZodRequest } from './ZodRequest';

export const zodReq = <
  R extends ParsableRequest,
  S extends Partial<RequestSchema>
>(
  schema: S,
  errorHandler?: IErrorHandler
) => {
  return ZodRequest.create({ schema, errorHandler });
};
