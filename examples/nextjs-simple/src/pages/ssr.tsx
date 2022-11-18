import type { InferReqSchema } from '@happy-next/zod-request';
import { zodReq } from '@happy-next/zod-request';
import type { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import { z } from 'zod';

const zr = zodReq({
  method: 'GET',
  query: {
    name: z.string().min(3).max(80).optional(),
    email: z.string().email('Invalid email').optional(),
  },
  headers: {
    host: z.string().optional(),
  },
  cookies: {},
});

type Props = {
  queryParams: InferReqSchema<typeof zr.schema>['query'];
  headers: InferReqSchema<typeof zr.schema>['headers'];
};

export default function ssrRoute(
  props: InferGetServerSidePropsType<typeof getServerSideProps>
) {
  const { name, email } = props.queryParams;
  const { host } = props.headers;
  return (
    <div>
      <h1>The data</h1>
      <ul>
        <li>{`Greetings ${name?.toUpperCase() ?? 'no-name'} !`}</li>
        <li>{email ? `Your email is ${email}` : `No email provided`}</li>
        <li>{host ? `From ${host}` : `No host header`}</li>
      </ul>
      <pre>{JSON.stringify(props.queryParams, null, 2)}</pre>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps<Props> = async (
  context
) => {
  const params = zr.parse({
    method: context.req.method,
    query: context.query,
    cookies: context.req.cookies,
    headers: context.req.headers,
  });
  return {
    props: {
      queryParams: params.query,
      headers: params.headers,
    },
  };
};
