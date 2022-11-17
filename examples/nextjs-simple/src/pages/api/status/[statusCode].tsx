import {
  createHttpException,
  isHttpErrorStatusCode,
} from '@belgattitude/http-exception';
import { zodReq } from '@happy-next/zod-request';

import type { NextApiRequest, NextApiResponse } from 'next';
import { z } from 'zod';
import { withApiErrorHandler } from '@/backend';
import { ConsoleLogger } from '@/lib';

const reqSchema = {
  method: 'GET',
  query: {
    statusCode: z.preprocess((input) => {
      const processed = z
        .string()
        .regex(/^\d+$/)
        .transform(Number)
        .safeParse(input);
      return processed.success ? processed.data : input;
    }, z.number().min(0)),
  },
} as const;

const statusHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  const parsed = zodReq(req, reqSchema);
  const { statusCode } = parsed.query;

  // Throw HttpException is statusCode query param is between 400 and 599.
  if (isHttpErrorStatusCode(statusCode)) {
    throw createHttpException(statusCode, {
      url: req.url,
    });
  }

  res.status(statusCode).json({
    success: true,
    data: {
      statusCode: statusCode,
      message: `${statusCode} is a not and error code, no reason to throw.`,
    },
  });
};

export default withApiErrorHandler({
  logger: new ConsoleLogger(),
})(statusHandler);
