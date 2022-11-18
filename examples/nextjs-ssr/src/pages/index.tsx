import type { InferZodRequest } from '@happy-next/zod-request';
import { zodReq } from '@happy-next/zod-request';
import type { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import { z } from 'zod';

const schema = zodReq({
  query: {
    name: z.string().min(3).max(80).optional(),
    email: z.string().email('Invalid email').optional(),
  },
  headers: {
    host: z.string().optional(),
    authorization: z
      .string()
      .regex(/^bearer /i)
      .optional(),
  },
});

type Props = {
  data: InferZodRequest<typeof schema>;
  // query: InferZodRequest<typeof schema>['query']
};

export default function ssrRoute(
  props: InferGetServerSidePropsType<typeof getServerSideProps>
) {
  const { name, email } = props.data.query;
  const { host } = props.data.headers;
  return (
    <div>
      <h1>The data</h1>
      <ul>
        <li>{`Greetings ${name?.toUpperCase() ?? 'no-name'} !`}</li>
        <li>{email ? `Your email is ${email}` : `No email provided`}</li>
        <li>{host ? `From ${host}` : `No host header`}</li>
      </ul>
      <pre>{JSON.stringify(props, null, 2)}</pre>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps<Props> = async (
  context
) => {
  const data = schema.parse({
    method: context.req.method,
    query: context.query,
    cookies: context.req.cookies,
    headers: context.req.headers,
  });
  return {
    props: {
      data,
    },
  };
};
