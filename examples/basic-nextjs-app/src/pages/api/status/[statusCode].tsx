import {
  createHttpException,
  isHttpErrorStatusCode,
} from '@belgattitude/http-exception';
import type { RequestSchema } from '@happy-next/zod-request';
import {
  HttpMethod,
  IncomingHttpHeadersKeys,
  zodReq,
} from '@happy-next/zod-request';
import type { TupleOfHttpMethods } from '@happy-next/zod-request/src/types';
import type { NextApiRequest, NextApiResponse } from 'next';
import type {
  ZodSchema,
  ZodObject,
  ZodRawShape,
  ZodNumber,
  ZodType,
  ZodTypeAny,
  ZodTypeDef,
} from 'zod';
import { unknown, z, ZodEnum } from 'zod';
import { withApiErrorHandler } from '@/backend';
import { zodStringToInt, ConsoleLogger } from '@/lib';

const stringToNumber = (arg: unknown) => {
  if (typeof arg === 'string') {
    const number = Number(arg);
    if (!isNaN(number)) {
      return number;
    }
  }
  return arg;
};

const reqSchema = {
  // method: 'GET',
  query: {
    // statusCode: zodStringToInt().number().min(100).max(599),
    statusCode: z.preprocess(stringToNumber, z.number().int().min(100)),
  },
} as const;

/**
type C<T extends Record<string, ZodTypeAny> = z.ZodObject<{
  [P in keyof T]: T[P] extends ZodTypeAny ? z.ZodType<T[P]> : never;
}>;
 */

type Y<T extends Record<string, unknown>> = {
  [P in keyof T]: T[P];
};

const blah2 = <T extends Record<string, z.ZodType>>(
  p: T
): ZodObject<{
  query: ZodObject<{
    [P in keyof T]: T[P];
  }>;
}> => {
  return z.object({ query: z.object(p) });
};

const uu2 = blah2({
  blue: z.preprocess(stringToNumber, z.number().int().min(100)),
});

const gg2 = uu2.parse({
  query: {
    blue: '100',
  },
}).query.blue;

interface Biloute {
  query: Record<'status', z.ZodType>;
}

type TG = Biloute['query'];
const tg: TG = {
  status: z.number(),
};

const query = <T extends { query: Record<string, z.ZodType> }>(
  p: T
): z.ZodObject<{
  // query: z.ZodObject<{
  //  [P in keyof T['query']]: T['query'][P] extends z.ZodType
  //    ? T['query'][P]
  //    : never; // T['query'][P];
  // }>;
  query: z.ZodObject<T['query']>;
  // query: z.ZodObject<Record<'status', z.ZodType>>;
  // query: z.ZodObject<{ [K in keyof T['query']]: T['query'][K] extends z.ZodType ? T['query'][K] : never }[keyof T]>;
  // query: z.ZodObject<Record<keyof T['query'], z.ZodType>>;
}> => {
  const a = z.object(p.query);
  return z.object({
    // query: z.object({ status: z.number() }),
    query: z.object(p.query),
  });
};

const uu = blah({
  query: {
    status: z.preprocess(stringToNumber, z.number().int().min(100)),
  },
});

const gg = uu.parse({
  query: {
    blue: '100',
  },
});

console.log(gg.query.status + 1);

const statusHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  // Throw HttpBadRequest if didn't pass schema requirements
  const parsed = zodReq(req, reqSchema).parse();

  const createSchema = <
    T extends {
      query: Record<string, z.ZodType>;
    }
  >(
    schema: T
  ): {
    query2?: ZodType<T['query']>;
    query: z.ZodObject<{
      [P in keyof T['query']]: T['query'][P] extends ZodTypeAny
        ? z.infer<T['query'][P]>
        : never;
    }>;
  } => {
    return {
      query: z.object(schema.query),
    };
  };
  const getSchema = () => {
    return createSchema({
      query: {
        status: z.preprocess(stringToNumber, z.number().int().min(100)),
      },
    });
  };

  const getSchema2 = () => {
    return z.object({
      query: z.object({
        status: z.preprocess(stringToNumber, z.number().int().min(100)),
      }),
    });
  };

  type I2 = z.infer<ReturnType<typeof getSchema2>>;
  const i2: I2 = {
    query: {
      status: 100,
    },
  };

  type I = z.infer<ReturnType<typeof getSchema>['query']>;
  const i: I = {
    status: 100,
  };
  const parsed2 = getSchema().safeParse({ status: '100' });
  if (parsed2.success) {
    const test = parsed2.data.status + 1;
  }

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
