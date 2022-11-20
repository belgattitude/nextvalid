[@nextvalid/zod-request](../README.md) / ZodRequest

# Class: ZodRequest<T\>

## Type parameters

| Name | Type                                                  |
| :--- | :---------------------------------------------------- |
| `T`  | extends [`RequestSchema`](../README.md#requestschema) |

## Table of contents

### Constructors

- [constructor](ZodRequest.md#constructor)

### Properties

- [schema](ZodRequest.md#schema)

### Methods

- [parse](ZodRequest.md#parse)
- [create](ZodRequest.md#create)

## Constructors

### constructor

• **new ZodRequest**<`T`\>(`schema`, `errorHandler?`)

#### Type parameters

| Name | Type                                                  |
| :--- | :---------------------------------------------------- |
| `T`  | extends [`RequestSchema`](../README.md#requestschema) |

#### Parameters

| Name            | Type                                              |
| :-------------- | :------------------------------------------------ |
| `schema`        | `T`                                               |
| `errorHandler?` | [`IErrorHandler`](../interfaces/IErrorHandler.md) |

## Properties

### schema

• `Readonly` **schema**: `T`

## Methods

### parse

▸ **parse**(`req`): { [k\_1 in "method" \| "query" \| "headers" \| "cookies"]: addQuestionMarks<Object\>[k\_1] }

#### Parameters

| Name  | Type                                              |
| :---- | :------------------------------------------------ |
| `req` | [`ParsableRequest`](../README.md#parsablerequest) |

#### Returns

{ [k\_1 in "method" \| "query" \| "headers" \| "cookies"]: addQuestionMarks<Object\>[k\_1] }

---

### create

▸ `Static` **create**<`S`\>(`params`): [`ZodRequest`](ZodRequest.md)<{ `cookies`: `Record`<`string`, `ZodType`<`any`, `ZodTypeDef`, `any`\>\> ; `headers`: `Record`<`IncomingHttpHeadersKeys`, `ZodType`<`any`, `ZodTypeDef`, `any`\>\> ; `method`: `string` \| (`"GET"` \| `"POST"` \| `"PUT"` \| `"DELETE"` \| `"PATCH"` \| `"TRACE"`)[] ; `query`: `Record`<`string`, `ZodType`<`any`, `ZodTypeDef`, `any`\>\> } & `S` \| { `cookies`: {} = {}; `headers`: {} = {}; `method`: `"GET"` = 'GET'; `query`: {} = {} } & `S`\>

#### Type parameters

| Name | Type                                                              |
| :--- | :---------------------------------------------------------------- |
| `S`  | extends `Partial`<[`RequestSchema`](../README.md#requestschema)\> |

#### Parameters

| Name                   | Type                                              |
| :--------------------- | :------------------------------------------------ |
| `params`               | `Object`                                          |
| `params.defaults?`     | [`RequestSchema`](../README.md#requestschema)     |
| `params.errorHandler?` | [`IErrorHandler`](../interfaces/IErrorHandler.md) |
| `params.schema`        | `S`                                               |

#### Returns

[`ZodRequest`](ZodRequest.md)<{ `cookies`: `Record`<`string`, `ZodType`<`any`, `ZodTypeDef`, `any`\>\> ; `headers`: `Record`<`IncomingHttpHeadersKeys`, `ZodType`<`any`, `ZodTypeDef`, `any`\>\> ; `method`: `string` \| (`"GET"` \| `"POST"` \| `"PUT"` \| `"DELETE"` \| `"PATCH"` \| `"TRACE"`)[] ; `query`: `Record`<`string`, `ZodType`<`any`, `ZodTypeDef`, `any`\>\> } & `S` \| { `cookies`: {} = {}; `headers`: {} = {}; `method`: `"GET"` = 'GET'; `query`: {} = {} } & `S`\>
