[@nextvalid/zod-request](../README.md) / ZodServerSideProps

# Class: ZodServerSideProps<T\>

## Type parameters

| Name | Type                                                                  |
| :--- | :-------------------------------------------------------------------- |
| `T`  | extends [`ServerSidePropsSchema`](../README.md#serversidepropsschema) |

## Table of contents

### Constructors

- [constructor](ZodServerSideProps.md#constructor)

### Properties

- [schema](ZodServerSideProps.md#schema)

### Methods

- [parse](ZodServerSideProps.md#parse)
- [create](ZodServerSideProps.md#create)

## Constructors

### constructor

• **new ZodServerSideProps**<`T`\>(`schema`, `errorHandler?`)

#### Type parameters

| Name | Type                                                                  |
| :--- | :-------------------------------------------------------------------- |
| `T`  | extends [`ServerSidePropsSchema`](../README.md#serversidepropsschema) |

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

▸ **parse**(`context`): { [k\_1 in "method" \| "query" \| "headers" \| "cookies"]: addQuestionMarks<Object\>[k\_1] }

#### Parameters

| Name      | Type                                                      |
| :-------- | :-------------------------------------------------------- |
| `context` | [`ParsableGsspContext`](../README.md#parsablegsspcontext) |

#### Returns

{ [k\_1 in "method" \| "query" \| "headers" \| "cookies"]: addQuestionMarks<Object\>[k\_1] }

---

### create

▸ `Static` **create**<`S`\>(`params`): [`ZodServerSideProps`](ZodServerSideProps.md)<{ `cookies`: `Record`<`string`, `ZodType`<`any`, `ZodTypeDef`, `any`\>\> ; `headers`: `Record`<`IncomingHttpHeadersKeys`, `ZodType`<`any`, `ZodTypeDef`, `any`\>\> ; `method`: `string` \| (`"GET"` \| `"POST"` \| `"PUT"` \| `"DELETE"` \| `"PATCH"` \| `"TRACE"`)[] ; `query`: `Record`<`string`, `ZodType`<`any`, `ZodTypeDef`, `any`\>\> } & `S` \| { `cookies`: {} = {}; `headers`: {} = {}; `method`: `"GET"` = 'GET'; `query`: {} = {} } & `S`\>

#### Type parameters

| Name | Type                                                                              |
| :--- | :-------------------------------------------------------------------------------- |
| `S`  | extends `Partial`<[`ServerSidePropsSchema`](../README.md#serversidepropsschema)\> |

#### Parameters

| Name                   | Type                                                          |
| :--------------------- | :------------------------------------------------------------ |
| `params`               | `Object`                                                      |
| `params.defaults?`     | [`ServerSidePropsSchema`](../README.md#serversidepropsschema) |
| `params.errorHandler?` | [`IErrorHandler`](../interfaces/IErrorHandler.md)             |
| `params.schema`        | `S`                                                           |

#### Returns

[`ZodServerSideProps`](ZodServerSideProps.md)<{ `cookies`: `Record`<`string`, `ZodType`<`any`, `ZodTypeDef`, `any`\>\> ; `headers`: `Record`<`IncomingHttpHeadersKeys`, `ZodType`<`any`, `ZodTypeDef`, `any`\>\> ; `method`: `string` \| (`"GET"` \| `"POST"` \| `"PUT"` \| `"DELETE"` \| `"PATCH"` \| `"TRACE"`)[] ; `query`: `Record`<`string`, `ZodType`<`any`, `ZodTypeDef`, `any`\>\> } & `S` \| { `cookies`: {} = {}; `headers`: {} = {}; `method`: `"GET"` = 'GET'; `query`: {} = {} } & `S`\>
