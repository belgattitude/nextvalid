@happy-next/zod-request

# @happy-next/zod-request

## Table of contents

### Classes

- [ZodRequest](classes/ZodRequest.md)

### Type Aliases

- [HttpMethod](README.md#httpmethod)
- [IncomingHttpHeadersKeys](README.md#incominghttpheaderskeys)
- [NextApiRequestSchema](README.md#nextapirequestschema)
- [ParsableApiRequest](README.md#parsableapirequest)

### Functions

- [zodReq](README.md#zodreq)

## Type Aliases

### HttpMethod

Ƭ **HttpMethod**: typeof `httpMethods`[`number`]

---

### IncomingHttpHeadersKeys

Ƭ **IncomingHttpHeadersKeys**: keyof `AdditionalRequestHeaders` \| keyof `IncomingHttpHeaders`

**`See`**

https://developer.mozilla.org/en-US/docs/Glossary/Request_header

---

### NextApiRequestSchema

Ƭ **NextApiRequestSchema**: `Object`

#### Type declaration

| Name       | Type                                                                                               |
| :--------- | :------------------------------------------------------------------------------------------------- |
| `cookies?` | `Record`<`string`, `ZodSchema`\>                                                                   |
| `headers?` | `Record`<[`IncomingHttpHeadersKeys`](README.md#incominghttpheaderskeys) \| `string`, `ZodSchema`\> |
| `method`   | `string`                                                                                           |
| `query?`   | `Record`<`string`, `ZodSchema`\>                                                                   |

---

### ParsableApiRequest

Ƭ **ParsableApiRequest**: `Pick`<`NextApiRequest`, `"query"` \| `"cookies"` \| `"headers"` \| `"method"`\> & `Pick`<`IncomingMessage`, `"url"`\>

## Functions

### zodReq

▸ **zodReq**<`TSchema`, `TReq`\>(`req`, `schema`): [`ZodRequest`](classes/ZodRequest.md)<`TSchema`, `TReq`\>

#### Type parameters

| Name      | Type                                                                                        |
| :-------- | :------------------------------------------------------------------------------------------ |
| `TSchema` | extends [`NextApiRequestSchema`](README.md#nextapirequestschema)                            |
| `TReq`    | extends `Partial`<[`ParsableApiRequest`](README.md#parsableapirequest)\> = `NextApiRequest` |

#### Parameters

| Name     | Type      |
| :------- | :-------- |
| `req`    | `TReq`    |
| `schema` | `TSchema` |

#### Returns

[`ZodRequest`](classes/ZodRequest.md)<`TSchema`, `TReq`\>
