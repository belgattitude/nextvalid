import type { mapRequestSchemaToZod } from '@happy-next/zod-request';
import { zodReq } from '@happy-next/zod-request';
import type { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import { z } from 'zod';

const schema = {
  method: 'GET',
  query: {
    name: z.string().min(3).max(80).optional(),
    email: z.string().email('Invalid email').optional(),
  },
  headers: {
    accept: z.string().regex(/html/),
  },
  cookies: {},
} as const;

type Schema = z.infer<ReturnType<typeof mapRequestSchemaToZod<typeof schema>>>;

type Props = {
  params: Schema;
};

export default function ssrRoute(
  props: InferGetServerSidePropsType<typeof getServerSideProps>
) {
  const { params } = props;
  // params.query.email;
  return (
    <div>
      <h1>The query params</h1>
      <pre>{JSON.stringify(params, null, 2)}</pre>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps<Props> = async (
  context
) => {
  const params = zodReq(
    {
      method: context.req.method,
      query: context.query,
      cookies: context.req.cookies,
      headers: context.req.headers,
    },
    schema
  );
  return {
    props: {
      params,
    },
  };
};
