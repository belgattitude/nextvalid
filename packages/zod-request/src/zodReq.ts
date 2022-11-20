import type { IErrorHandler } from './error';
import type { RequestSchema } from './types';
import { ZodRequest } from './ZodRequest';

export const zodReq = <S extends Partial<RequestSchema>>(
  schema: S,
  errorHandler?: IErrorHandler
) => {
  return ZodRequest.create({ schema, errorHandler });
};
