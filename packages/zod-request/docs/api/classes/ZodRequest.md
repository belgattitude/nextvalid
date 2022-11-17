[@happy-next/zod-request](../README.md) / ZodRequest

# Class: ZodRequest<T\>

## Type parameters

| Name | Type                                                  |
| :--- | :---------------------------------------------------- |
| `T`  | extends [`RequestSchema`](../README.md#requestschema) |

## Table of contents

### Constructors

- [constructor](ZodRequest.md#constructor)

### Methods

- [parse](ZodRequest.md#parse)

## Constructors

### constructor

• **new ZodRequest**<`T`\>(`schema`, `errorHandler?`)

#### Type parameters

| Name | Type                                                  |
| :--- | :---------------------------------------------------- |
| `T`  | extends [`RequestSchema`](../README.md#requestschema) |

#### Parameters

| Name            | Type            |
| :-------------- | :-------------- |
| `schema`        | `T`             |
| `errorHandler?` | `IErrorHandler` |

## Methods

### parse

▸ **parse**(`req`): { [k\_1 in "method" \| "query" \| "cookies" \| "headers"]: addQuestionMarks<Object\>[k\_1] }

#### Parameters

| Name  | Type                                                    |
| :---- | :------------------------------------------------------ |
| `req` | [`ParsableApiRequest`](../README.md#parsableapirequest) |

#### Returns

{ [k\_1 in "method" \| "query" \| "cookies" \| "headers"]: addQuestionMarks<Object\>[k\_1] }
