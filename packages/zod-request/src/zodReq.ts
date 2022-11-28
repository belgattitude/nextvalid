import type { IErrorHandler } from './error';
import type { RequestSchema } from './types';
import { ZodRequest } from './ZodRequest';

/**
 * Convenience helper for ZodRequest
 *
 * ```ts
 * import { zodReq } from '@nextvalid/zod-quest';
 * import { z } from 'zod';
 * import type { NextApiRequest, NextApiResponse } from 'next';
 *
 * const apiRoute: NextApiHandler = async (req, res) => {
 *   const schema = zodReq({
 *     method: 'GET',
 *     query: { email: z.string().email() },
 *     // headers, cookies...
 *  });
 *  // Will throw if `?=email=value` didn't pass validation
 *  const { query } = schema.parse(req);
 *  // query.email is string
 * }
 *
 * // Optionally enclose with an HOF that catches the exception
 * export default apiRoute;
 * ```
 */
export const zodReq = <S extends Partial<RequestSchema>>(
  schema: S,
  errorHandler?: IErrorHandler
) => {
  return ZodRequest.create({ schema, errorHandler });
};
