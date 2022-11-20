# @nextvalid/zod-request

[![npm](https://img.shields.io/npm/v/@next-helpers/zod-request?style=for-the-badge&labelColor=222)](https://www.npmjs.com/package/@next-helpers/zod-request)
[![size](https://img.shields.io/bundlephobia/minzip/@next-helpers/zod-request@latest?label=MinGZIP&style=for-the-badge&labelColor=333&color=informational)](https://bundlephobia.com/package/@next-helpers/zod-request@latest)
[![node](https://img.shields.io/static/v1?label=Node&message=14%2b&logo=node.js&style=for-the-badge&labelColor=444&color=informational)](https://browserslist.dev/?q=PjAuMjUlLCBub3QgZGVhZA%3D%3D)
[![browserslist](https://img.shields.io/static/v1?label=Browser&message=>0.25%&logo=googlechrome&style=for-the-badge&labelColor=444&color=informational)](https://browserslist.dev/?q=PjAuMjUlLCBub3QgZGVhZA%3D%3D)
[![dist](https://img.shields.io/static/v1?label=&message=cjs|esm|treeshake&logo=webpack&style=for-the-badge&labelColor=444&color=informational)](https://github.com/belgattitude/next-helpers/blob/main/packages/next-helpers/.size-limit.cjs)
[![ci](https://img.shields.io/github/checks-status/belgattitude/next-helpers/main?label=CI&logo=github&style=for-the-badge&labelColor=444)](https://github.com/belgattitude/next-helpers/actions?query=branch%3Amain)
[![codecov](https://img.shields.io/codecov/c/github/belgattitude/next-helpers?logo=codecov&style=for-the-badge&labelColor=444)](https://codecov.io/gh/belgattitude/next-helpers)
[![techdebt](https://img.shields.io/codeclimate/tech-debt/belgattitude/next-helpers?label=TechDebt&logo=code-climate&style=for-the-badge&labelColor=444)](https://codeclimate.com/github/belgattitude/next-helpers)
[![maintainability](https://img.shields.io/codeclimate/maintainability/belgattitude/next-helpers?label=Maintainability&logo=code-climate&style=for-the-badge&labelColor=444)](https://codeclimate.com/github/belgattitude/next-helpers)
[![license](https://img.shields.io/npm/l/@next-helpers/zod-request?style=for-the-badge&labelColor=000000)](https://github.com/belgattitude/next-helpers/blob/main/LICENSE)
[![ko-fi](https://img.shields.io/badge/Ko--fi-F16061?style=for-the-badge&logo=ko-fi&logoColor=white)](https://ko-fi.com/belgattitude)

## Highlights

- 🚀&nbsp; Dead simple

## Documentation

## Install

```bash
npm install @next-helpers/zod-request --save  # via npm
yarn add @next-helpers/zod-request            # via yarn
```

## Quick start

### Api routes

Define a schema

```typescript
import { z } from "zod";

const reqSchema = z.object({
  method: "GET",
  query: z.object({
    email: z.string().email("Invalid email"),
  }),
});

const myApiRouteHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  // TODO
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
```

### SSR pages

`getServerSideProps`, `getStaticProps`
