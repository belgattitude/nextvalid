@nextvalid/zod-request

# @nextvalid/zod-request

## Table of contents

### Classes

- [ZodRequest](classes/ZodRequest.md)
- [ZodServerSideProps](classes/ZodServerSideProps.md)

### Interfaces

- [IErrorHandler](interfaces/IErrorHandler.md)

### Type Aliases

- [InferReqSchema](README.md#inferreqschema)
- [InferServerSidePropsSchema](README.md#inferserversidepropsschema)
- [InferZodRequest](README.md#inferzodrequest)
- [InferZodServerSideProps](README.md#inferzodserversideprops)
- [ParsableGsspContext](README.md#parsablegsspcontext)
- [ParsableRequest](README.md#parsablerequest)
- [RequestSchema](README.md#requestschema)
- [ServerSidePropsSchema](README.md#serversidepropsschema)

### Functions

- [zodGssp](README.md#zodgssp)
- [zodReq](README.md#zodreq)

## Type Aliases

### InferReqSchema

Ƭ **InferReqSchema**<`T`\>: `z.infer`<`ReturnType`<typeof `mapRequestSchemaToZod`\>\>

#### Type parameters

| Name | Type                                                           |
| :--- | :------------------------------------------------------------- |
| `T`  | extends `Partial`<[`RequestSchema`](README.md#requestschema)\> |

---

### InferServerSidePropsSchema

Ƭ **InferServerSidePropsSchema**<`T`\>: `z.infer`<`ReturnType`<typeof `mapServerSidePropsSchemaToZod`\>\>

#### Type parameters

| Name | Type                                                                           |
| :--- | :----------------------------------------------------------------------------- |
| `T`  | extends `Partial`<[`ServerSidePropsSchema`](README.md#serversidepropsschema)\> |

---

### InferZodRequest

Ƭ **InferZodRequest**<`ZR`, `T`\>: `z.infer`<`ReturnType`<typeof `mapRequestSchemaToZod`\>\>

#### Type parameters

| Name | Type                                                                                       |
| :--- | :----------------------------------------------------------------------------------------- |
| `ZR` | extends [`ZodRequest`](classes/ZodRequest.md)<[`RequestSchema`](README.md#requestschema)\> |
| `T`  | `ZR`[``"schema"``]                                                                         |

---

### InferZodServerSideProps

Ƭ **InferZodServerSideProps**<`ZR`, `T`\>: `z.infer`<`ReturnType`<typeof `mapRequestSchemaToZod`\>\>

#### Type parameters

| Name | Type                                                                                                                       |
| :--- | :------------------------------------------------------------------------------------------------------------------------- |
| `ZR` | extends [`ZodServerSideProps`](classes/ZodServerSideProps.md)<[`ServerSidePropsSchema`](README.md#serversidepropsschema)\> |
| `T`  | `ZR`[``"schema"``]                                                                                                         |

---

### ParsableGsspContext

Ƭ **ParsableGsspContext**: `Object`

#### Type declaration

| Name      | Type                                                                                                                  |
| :-------- | :-------------------------------------------------------------------------------------------------------------------- |
| `locale?` | `GetServerSidePropsContext`[``"locale"``]                                                                             |
| `query`   | `GetServerSidePropsContext`[``"query"``]                                                                              |
| `req`     | `Pick`<`GetServerSidePropsContext`[``"req"``], `"cookies"` \| `"headers"`\> & { `method?`: `HttpMethod` \| `string` } |

---

### ParsableRequest

Ƭ **ParsableRequest**: `Pick`<`NextApiRequest`, `"query"` \| `"cookies"` \| `"headers"`\> & `Pick`<`IncomingMessage`, `"url"`\> & { `method?`: `HttpMethod` \| `string` }

---

### RequestSchema

Ƭ **RequestSchema**: `Object`

Schema for validating api routes requests (a.k.a NextApiRequest)

#### Type declaration

| Name      | Type                                                        |
| :-------- | :---------------------------------------------------------- |
| `cookies` | `Record`<`string`, `ZodType`\>                              |
| `headers` | `Record`<`IncomingHttpHeadersKeys` \| `string`, `ZodType`\> |
| `method`  | `HttpMethod` \| `HttpMethod`[] \| `string`                  |
| `query`   | `Record`<`string`, `ZodType`\>                              |

---

### ServerSidePropsSchema

Ƭ **ServerSidePropsSchema**: `Pick`<[`RequestSchema`](README.md#requestschema), `"method"` \| `"headers"` \| `"cookies"`\> & { `query`: `Record`<`string`, `ZodType`\> }

Schema for validating GetServerSidePropsContext

## Functions

### zodGssp

▸ **zodGssp**<`S`\>(`schema`, `errorHandler?`): [`ZodServerSideProps`](classes/ZodServerSideProps.md)<{ `cookies`: `Record`<`string`, `ZodType`<`any`, `ZodTypeDef`, `any`\>\> ; `headers`: `Record`<`IncomingHttpHeadersKeys`, `ZodType`<`any`, `ZodTypeDef`, `any`\>\> ; `method`: `string` \| (`"GET"` \| `"POST"` \| `"PUT"` \| `"DELETE"` \| `"PATCH"` \| `"TRACE"`)[] ; `query`: `Record`<`string`, `ZodType`<`any`, `ZodTypeDef`, `any`\>\> } & `S` \| { `cookies`: {} = {}; `headers`: {} = {}; `method`: `"GET"` = 'GET'; `query`: {} = {} } & `S`\>

#### Type parameters

| Name | Type                                                                           |
| :--- | :----------------------------------------------------------------------------- |
| `S`  | extends `Partial`<[`ServerSidePropsSchema`](README.md#serversidepropsschema)\> |

#### Parameters

| Name            | Type                                           |
| :-------------- | :--------------------------------------------- |
| `schema`        | `S`                                            |
| `errorHandler?` | [`IErrorHandler`](interfaces/IErrorHandler.md) |

#### Returns

[`ZodServerSideProps`](classes/ZodServerSideProps.md)<{ `cookies`: `Record`<`string`, `ZodType`<`any`, `ZodTypeDef`, `any`\>\> ; `headers`: `Record`<`IncomingHttpHeadersKeys`, `ZodType`<`any`, `ZodTypeDef`, `any`\>\> ; `method`: `string` \| (`"GET"` \| `"POST"` \| `"PUT"` \| `"DELETE"` \| `"PATCH"` \| `"TRACE"`)[] ; `query`: `Record`<`string`, `ZodType`<`any`, `ZodTypeDef`, `any`\>\> } & `S` \| { `cookies`: {} = {}; `headers`: {} = {}; `method`: `"GET"` = 'GET'; `query`: {} = {} } & `S`\>

---

### zodReq

▸ **zodReq**<`S`\>(`schema`, `errorHandler?`): [`ZodRequest`](classes/ZodRequest.md)<{ `cookies`: `Record`<`string`, `ZodType`<`any`, `ZodTypeDef`, `any`\>\> ; `headers`: `Record`<`IncomingHttpHeadersKeys`, `ZodType`<`any`, `ZodTypeDef`, `any`\>\> ; `method`: `string` \| (`"GET"` \| `"POST"` \| `"PUT"` \| `"DELETE"` \| `"PATCH"` \| `"TRACE"`)[] ; `query`: `Record`<`string`, `ZodType`<`any`, `ZodTypeDef`, `any`\>\> } & `S` \| { `cookies`: {} = {}; `headers`: {} = {}; `method`: `"GET"` = 'GET'; `query`: {} = {} } & `S`\>

Convenience helper for ZodRequest

```ts
import { zodReq } from "@nextvalid/zod-quest";
import { z } from "zod";
import type { NextApiRequest, NextApiResponse } from "next";

export default apiRoute = async (req: NextApiRequest, res: NextApiResponse) => {
  const schema = zodReq({
    method: "GET",
    query: { email: z.string().email() },
    // headers, cookies...
  });
  // Will throw if `?=email=value` didn't pass validation
  const { query } = schema.parse(req);
  // query.email is string
};
```

#### Type parameters

| Name | Type                                                           |
| :--- | :------------------------------------------------------------- |
| `S`  | extends `Partial`<[`RequestSchema`](README.md#requestschema)\> |

#### Parameters

| Name            | Type                                           |
| :-------------- | :--------------------------------------------- |
| `schema`        | `S`                                            |
| `errorHandler?` | [`IErrorHandler`](interfaces/IErrorHandler.md) |

#### Returns

[`ZodRequest`](classes/ZodRequest.md)<{ `cookies`: `Record`<`string`, `ZodType`<`any`, `ZodTypeDef`, `any`\>\> ; `headers`: `Record`<`IncomingHttpHeadersKeys`, `ZodType`<`any`, `ZodTypeDef`, `any`\>\> ; `method`: `string` \| (`"GET"` \| `"POST"` \| `"PUT"` \| `"DELETE"` \| `"PATCH"` \| `"TRACE"`)[] ; `query`: `Record`<`string`, `ZodType`<`any`, `ZodTypeDef`, `any`\>\> } & `S` \| { `cookies`: {} = {}; `headers`: {} = {}; `method`: `"GET"` = 'GET'; `query`: {} = {} } & `S`\>
