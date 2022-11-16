[@happy-next/zod-request](../README.md) / ZodRequest

# Class: ZodRequest<TSchema, TReq\>

## Type parameters

| Name      | Type                                                                                           |
| :-------- | :--------------------------------------------------------------------------------------------- |
| `TSchema` | extends [`NextApiRequestSchema`](../README.md#nextapirequestschema)                            |
| `TReq`    | extends `Partial`<[`ParsableApiRequest`](../README.md#parsableapirequest)\> = `NextApiRequest` |

## Table of contents

### Constructors

- [constructor](ZodRequest.md#constructor)

### Methods

- [parse](ZodRequest.md#parse)

## Constructors

### constructor

• **new ZodRequest**<`TSchema`, `TReq`\>(`req`, `schema`)

#### Type parameters

| Name      | Type                                                                                           |
| :-------- | :--------------------------------------------------------------------------------------------- |
| `TSchema` | extends [`NextApiRequestSchema`](../README.md#nextapirequestschema)                            |
| `TReq`    | extends `Partial`<[`ParsableApiRequest`](../README.md#parsableapirequest)\> = `NextApiRequest` |

#### Parameters

| Name     | Type      |
| :------- | :-------- |
| `req`    | `TReq`    |
| `schema` | `TSchema` |

## Methods

### parse

▸ **parse**(`params?`): { [k in "query" \| "cookies" \| "headers" \| "method"]: addQuestionMarks<Object\>[k] }

#### Parameters

| Name      | Type                 |
| :-------- | :------------------- |
| `params?` | `Params`<`TSchema`\> |

#### Returns

{ [k in "query" \| "cookies" \| "headers" \| "method"]: addQuestionMarks<Object\>[k] }
