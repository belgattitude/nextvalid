@happy-next/zod-request

# @happy-next/zod-request

## Table of contents

### Classes

- [ZodRequest](classes/ZodRequest.md)

### Type Aliases

- [HttpMethod](README.md#httpmethod)
- [HttpMethods](README.md#httpmethods)
- [IncomingHttpHeadersKeys](README.md#incominghttpheaderskeys)
- [ParsableApiRequest](README.md#parsableapirequest)
- [RequestSchema](README.md#requestschema)

### Functions

- [zodReq](README.md#zodreq)

## Type Aliases

### HttpMethod

Ƭ **HttpMethod**: typeof `httpMethods`[`number`]

---

### HttpMethods

Ƭ **HttpMethods**: typeof `httpMethods`

---

### IncomingHttpHeadersKeys

Ƭ **IncomingHttpHeadersKeys**: keyof `AdditionalRequestHeaders` \| keyof `IncomingHttpHeaders`

**`See`**

https://developer.mozilla.org/en-US/docs/Glossary/Request_header

---

### ParsableApiRequest

Ƭ **ParsableApiRequest**: `Pick`<`NextApiRequest`, `"query"` \| `"cookies"` \| `"headers"`\> & `Pick`<`IncomingMessage`, `"url"`\> & { `method?`: [`HttpMethod`](README.md#httpmethod) \| `string` }

---

### RequestSchema

Ƭ **RequestSchema**: `Object`

#### Type declaration

| Name      | Type                                                                                                                                                                                       |
| :-------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `cookies` | `Record`<`string`, `ZodType`\>                                                                                                                                                             |
| `headers` | `Record`<[`IncomingHttpHeadersKeys`](README.md#incominghttpheaderskeys) \| `string`, `ZodType`\>                                                                                           |
| `method`  | `Readonly`<[`HttpMethod`](README.md#httpmethod)\> \| [`HttpMethod`](README.md#httpmethod) \| `Readonly`<[`HttpMethod`](README.md#httpmethod)[]\> \| [`HttpMethod`](README.md#httpmethod)[] |
| `query`   | `Record`<`string`, `ZodType`\>                                                                                                                                                             |

## Functions

### zodReq

▸ **zodReq**<`R`, `S`\>(`req`, `schema`): { [k\_1 in "method" \| "query" \| "cookies" \| "headers"]: addQuestionMarks<Object\>[k\_1] }

#### Type parameters

| Name | Type                                                         |
| :--- | :----------------------------------------------------------- |
| `R`  | extends [`ParsableApiRequest`](README.md#parsableapirequest) |
| `S`  | extends `Partial`<`RequestSchemaWithoutMethod`\>             |

#### Parameters

| Name     | Type |
| :------- | :--- |
| `req`    | `R`  |
| `schema` | `S`  |

#### Returns

{ [k\_1 in "method" \| "query" \| "cookies" \| "headers"]: addQuestionMarks<Object\>[k\_1] }
